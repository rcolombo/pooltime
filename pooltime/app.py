from flask import Flask
from flask import render_template
from flask import request
from flask import Response

from models.game import Game
from models.selection import Selection
from models.user import User

from sqlalchemy import create_engine
from sqlalchemy import and_
from sqlalchemy import func
from sqlalchemy.orm import sessionmaker

import simplejson as json

import eventlet
import livescores

eventlet.monkey_patch()
app = Flask(__name__)

db_uri = 'postgresql://localhost/pooltime'
engine = create_engine(db_uri)
Session = sessionmaker(engine)
session = Session()

score_streamer = livescores.ScoreStreamer()

users = session.query(User).all()

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/games', methods=['GET'])
@app.route('/games/<int:week>', methods=['GET'])
def games(week=None):
    if week is None:
        return 'No week number provided', 400

    games = session.query(Game).filter_by(week=week).all()
    games = [g.to_dict() for g in games]
    return json.dumps(games), 200

@app.route('/picks', methods=['PUT'])
@app.route('/picks/<int:week>', methods=['GET'])
def picks(week=None):
    if request.method == 'PUT':
        if not request.json:
            return 'Non-JSON Request', 400
        if 'user_id' not in request.json:
            return 'Request must contain \'user_id\' field', 400
        if 'selections' not in request.json:
            return 'Request must contain \'selections\' field', 400

        u = session.query(User).filter_by(id=request.json['user_id']).first()
        if u is None:
            return 'Invalid user_id', 400

        for s in request.json['selections']:
            g = session.query(Game.home, Game.away).filter_by(id=s['game_id']).first()
            if g is None:
                continue
            if s['team'] not in g:
                continue

            rec = {
                    'user_id': request.json['user_id'],
                    'game_id': s['game_id'],
                    'team': s['team'],
            }
            selection = Selection(**rec)
            session.merge(selection)
            session.commit()
        return 'OK'

    elif request.method == 'GET':
        if week is None:
            return 'No week number provided', 400

        picks = session.query(User.name, Game.id, Selection.team) \
                        .join(Selection, User.id == Selection.user_id) \
                        .join(Game, and_(Game.id == Selection.game_id, Game.week == week))

        by_user = {}
        for p in picks:
            user = p[0]
            game_id = p[1]
            team = p[2]
            if user not in by_user:
                by_user[user] = []
            by_user[user].append({'game_id': game_id, 'team': team})

        return json.dumps(by_user), 200

@app.route('/lookup')
def lookup():
    if request.args.get('user') is None:
        return 'No user provided', 400

    uid = session.query(User.id) \
            .filter(func.lower(User.name) == request.args.get('user').lower()) \
            .first()
    if uid is None:
        return 'User Not Found', 401

    return str(uid[0]), 200

class ServerSentEvent(object):
    def __init__(self, data, event=None, id=None):
        self.data = json.dumps(data)
        self.event = event
        self.id = id
        self.desc_map = {
            self.data : "data",
            self.event : "event",
            self.id : "id"
        }

    def encode(self):
        if not self.data:
            return ""
        lines = ["%s: %s" % (v, k) 
                 for k, v in self.desc_map.iteritems() if k]
        
        return "%s\n\n" % "\n".join(lines)

@app.route('/livescores', methods=['GET'])
def scores():
    def sse_gen():
        for score in score_streamer.new_stream():
            yield ServerSentEvent(score, event='update').encode()

    return Response(sse_gen(), mimetype="text/event-stream")

if __name__ == '__main__':
    eventlet.spawn(score_streamer.run)
    app.run(host='0.0.0.0', debug=True, threaded=True)

