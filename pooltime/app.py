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

import simplejson as json

app = Flask(__name__)

db_uri = 'postgresql://localhost/pooltime'
engine = create_engine(db_uri)
Session = sessionmaker(engine)
session = Session()

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

@app.route('/picks', methods=['GET'])
def picks():
    return 'OK'

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
