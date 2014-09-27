from flask import Flask
from flask import render_template
from flask import request

from models.game import Game
from models.selection import Selection
from models.user import User

from sqlalchemy import create_engine
from sqlalchemy import and_
from sqlalchemy.orm import sessionmaker

import datetime
import requests

app = Flask(__name__)

db_uri = 'postgresql://localhost/pooltime'
engine = create_engine(db_uri)
Session = sessionmaker(engine)
session = Session()

wn = 1
games = session.query(Game).filter_by(week=wn).all()
users = session.query(User).all()

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')


@app.route('/make_picks', methods=['POST'])
def make_picks():
    now = datetime.datetime.now()
    if now.hour <= 13 and request.method == 'POST':
        records = []
        for k, v in request.form.items():
            if k in ('submit', 'user'):
                continue
            else:
                rec = {
                        'user_id' : request.form['user'],
                        'game_id' : k,
                        'selection' : v,
                      }
                selection = Selection(**rec)
                session.merge(selection)
                session.commit()

    if now.hour >= 13:
        return render_template('make_picks.html', games=games, users=users, show=False)
    else:
        return render_template('make_picks.html', games=games, users=users, show=True)

@app.route('/view_picks', methods=['GET'])
@app.route('/view_picks/<username>', methods=['GET'])
def view_picks(username=None):
    now = datetime.datetime.now()
    if now.hour >= 13:
        if username is not None:
            picks = session.query(Selection.selection, Game.home, Game.home_pts, Game.away, Game.away_pts, User.name) \
                           .join(Game, and_(Selection.game_id == Game.id, Game.week == 1)) \
                           .join(User, and_(Selection.user_id == User.id, User.name == username))
        else:
            picks = []
        return render_template('view_picks.html', show=True, username=username, picks=picks)
    else:
        return render_template('view_picks.html', show=False)

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
