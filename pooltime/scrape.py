#!/usr/bin/python
import requests
from models.game import Game

from bs4 import BeautifulSoup
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

db_uri = 'postgresql://localhost/pooltime'
engine = create_engine(db_uri)
Session = sessionmaker(engine)
session = Session()

def main():
    scores_scraper = LiveScoresScraper()
    scores_scraper.scrape()

# def get_week_num():
#     r = requests.get('http://espn.go.com/nfl/lines')

#     soup = BeautifulSoup(r.text, "html5lib")
#     week = soup. \
#             html. \
#             body. \
#             find('div', {'class': 'bg-elements'}). \
#             find('div', {'id': 'subheader'}). \
#             find('div', {'id': 'content-wrapper'}). \
#             find('div', {'id': 'content'}). \
#             find('div', {'class': 'span-6'}). \
#             h1.text
#     wn = re.search('[0-9]+', week)
#     return int(wn.group(0))

"""
{
    "2014120400": {
        "home":{
            "score":{
                "1":0, "2":7, "3":0, "4":21, "5":0, "T":28
            },
            "abbr":"CHI",
            "to":0
        },
        "away":{
            "score":{"1":0,"2":14,"3":21,"4":6,"5":0,"T":41},"abbr":"DAL","to":3},"bp":18,"down":0,"togo":0,"clock":"00:33","posteam":"DAL","note":null,"redzone":false,"stadium":"Soldier Field","media":{"radio":{"home":null,"away":null},"tv":"NFL NETWORK","sat":null,"sathd":null},"yl":"","qtr":"Final"},"2014120700":{"home":{"score":{"1":0,"2":14,"3":7,"4":0,"5":0,"T":21},"abbr":"CIN","to":1},"away":{"score":{"1":0,"2":10,"3":7,"4":25,"5":0,"T":42},"abbr":"PIT","to":2},"bp":19,"down":0,"togo":0,"clock":"00:23","posteam":"PIT","note":null,"redzone":false,"stadium":"Paul Brown Stadium","media":{"radio":{"home":null,"away":null},"tv":"CBS","sat":null,"sathd":null},"yl":"","qtr":"Final"},"2014120701":{"home":{"score":{"1":7,"2":7,"3":7,"4":3,"5":0,"T":24},"abbr":"CLE","to":1},"away":{"score":{"1":0,"2":7,"3":9,"4":9,"5":0,"T":25},"abbr":"IND","to":1},"bp":13,"down":0,"togo":0,"clock":"00:02","posteam":"IND","note":null,"redzone":false,"stadium":"FirstEnergy Stadium","media":{"radio":{"home":null,"away":null},"tv":"FOX","sat":null,"sathd":null},"yl":"","qtr":"Final"},"2014120702":{"home":{"score":{"1":7,"2":10,"3":10,"4":7,"5":0,"T":34},"abbr":"DET","to":3},"away":{"score":{"1":0,"2":10,"3":0,"4":7,"5":0,"T":17},"abbr":"TB","to":0},"bp":21,"down":0,"togo":0,"clock":"00:33","posteam":"DET","note":null,"redzone":false,"stadium":"Ford Field","media":{"radio":{"home":null,"away":null},"tv":"FOX","sat":null,"sathd":null},"yl":"","qtr":"Final"},"2014120703":{"home":{"score":{"1":7,"2":6,"3":0,"4":0,"5":0,"T":13},"abbr":"JAC","to":0},"away":{"score":{"1":3,"2":7,"3":7,"4":10,"5":0,"T":27},"abbr":"HOU","to":2},"bp":11,"down":0,"togo":0,"clock":"00:39","posteam":"HOU","note":null,"redzone":false,"stadium":"EverBank Field","media":{"radio":{"home":null,"away":null},"tv":"CBS","sat":null,"sathd":null},"yl":"","qtr":"Final"},"2014120704":{"home":{"score":{"1":10,"2":0,"3":0,"4":3,"5":0,"T":13},"abbr":"MIA","to":0},"away":{"score":{"1":0,"2":7,"3":7,"4":14,"5":0,"T":28},"abbr":"BAL","to":2},"bp":11,"down":0,"togo":0,"clock":"01:32","posteam":"BAL","note":null,"redzone":false,"stadium":"Sun Life Stadium","media":{"radio":{"home":null,"away":null},"tv":"CBS","sat":null,"sathd":null},"yl":"","qtr":"Final"},"2014120705":{"home":{"score":{"1":14,"2":7,"3":0,"4":3,"5":6,"T":30},"abbr":"MIN","to":2},"away":{"score":{"1":12,"2":3,"3":3,"4":6,"5":0,"T":24},"abbr":"NYJ","to":2},"bp":15,"down":1,"togo":10,"clock":"10:21","posteam":"MIN","note":null,"redzone":false,"stadium":"TCF Bank Stadium","media":{"radio":{"home":null,"away":null},"tv":"CBS","sat":null,"sathd":null},"yl":"NYJ 2","qtr":"final overtime"},"2014120706":{"home":{"score":{"1":0,"2":3,"3":0,"4":7,"5":0,"T":10},"abbr":"NO","to":3},"away":{"score":{"1":17,"2":7,"3":14,"4":3,"5":0,"T":41},"abbr":"CAR","to":1},"bp":14,"down":0,"togo":0,"clock":"00:29","posteam":"NO","note":null,"redzone":false,"stadium":"Mercedes-Benz Superdome","media":{"radio":{"home":null,"away":null},"tv":"FOX","sat":null,"sathd":null},"yl":"","qtr":"Final"},"2014120707":{"home":{"score":{"1":0,"2":0,"3":7,"4":0,"5":0,"T":7},"abbr":"TEN","to":2},"away":{"score":{"1":17,"2":6,"3":10,"4":3,"5":0,"T":36},"abbr":"NYG","to":2},"bp":10,"down":0,"togo":0,"clock":"00:22","posteam":"NYG","note":null,"redzone":false,"stadium":"LP Field","media":{"radio":{"home":null,"away":null},"tv":"FOX","sat":null,"sathd":null},"yl":"","qtr":"Final"},"2014120708":{"home":{"score":{"1":0,"2":0,"3":0,"4":0,"5":0,"T":0},"abbr":"WAS","to":2},"away":{"score":{"1":0,"2":6,"3":18,"4":0,"5":0,"T":24},"abbr":"STL","to":2},"bp":10,"down":0,"togo":0,"clock":"00:00","posteam":"STL","note":null,"redzone":false,"stadium":"FedExField","media":{"radio":{"home":null,"away":null},"tv":"FOX","sat":null,"sathd":null},"yl":"","qtr":"Final"},"2014120709":{"home":{"score":{"1":3,"2":3,"3":11,"4":0,"5":0,"T":17},"abbr":"ARI","to":0},"away":{"score":{"1":7,"2":7,"3":0,"4":0,"5":0,"T":14},"abbr":"KC","to":0},"bp":15,"down":0,"togo":0,"clock":"00:07","posteam":"ARI","note":null,"redzone":false,"stadium":"University of Phoenix Stadium","media":{"radio":{"home":null,"away":null},"tv":"CBS","sat":null,"sathd":null},"yl":"","qtr":"Final"},"2014120710":{"home":{"score":{"1":7,"2":7,"3":10,"4":0,"5":0,"T":24},"abbr":"DEN","to":2},"away":{"score":{"1":0,"2":3,"3":0,"4":14,"5":0,"T":17},"abbr":"BUF","to":0},"bp":18,"down":0,"togo":0,"clock":"00:38","posteam":"DEN","note":null,"redzone":false,"stadium":"Sports Authority Field at Mile High","media":{"radio":{"home":null,"away":null},"tv":"CBS","sat":null,"sathd":null},"yl":"","qtr":"Final"},"2014120711":{"home":{"score":{"1":3,"2":7,"3":7,"4":7,"5":0,"T":24},"abbr":"OAK","to":2},"away":{"score":{"1":7,"2":3,"3":3,"4":0,"5":0,"T":13},"abbr":"SF","to":0},"bp":8,"down":0,"togo":0,"clock":"00:04","posteam":"SF","note":null,"redzone":false,"stadium":"O.co Coliseum","media":{"radio":{"home":null,"away":null},"tv":"FOX","sat":null,"sathd":null},"yl":"","qtr":"Final"},"2014120712":{"home":{"score":{"1":7,"2":0,"3":7,"4":0,"5":0,"T":14},"abbr":"PHI","to":0},"away":{"score":{"1":0,"2":10,"3":14,"4":0,"5":0,"T":24},"abbr":"SEA","to":1},"bp":12,"down":0,"togo":0,"clock":"00:37","posteam":"SEA","note":null,"redzone":false,"stadium":"Lincoln Financial Field","media":{"radio":{"home":null,"away":null},"tv":"FOX","sat":null,"sathd":null},"yl":"","qtr":"Final"},"2014120713":{"home":{"score":{"1":0,"2":14,"3":0,"4":0,"5":0,"T":14},"abbr":"SD","to":0},"away":{"score":{"1":3,"2":10,"3":0,"4":10,"5":0,"T":23},"abbr":"NE","to":3},"bp":11,"down":0,"togo":0,"clock":"00:39","posteam":"NE","note":null,"redzone":false,"stadium":"Qualcomm Stadium","media":{"radio":{"home":null,"away":null},"tv":"NBC","sat":null,"sathd":null},"yl":"","qtr":"Final"},"2014120800":{"home":{"score":{"1":0,"2":0,"3":0,"4":0,"5":0,"T":0},"abbr":"GB","to":3},"away":{"score":{"1":0,"2":0,"3":0,"4":0,"5":0,"T":0},"abbr":"ATL","to":3},"bp":0,"down":0,"togo":0,"clock":"15:00","posteam":"ATL","note":null,"redzone":false,"stadium":"Lambeau Field","media":{"radio":{"home":null,"away":null},"tv":"ESPN","sat":null,"sathd":null},"yl":"","qtr":"Pregame"}}
"""
NFL_DOT_COM_TEAM_MAPPINGS = {
    'CHI': 'Chicago',
    'DAL': 'Dallas',
    'CIN': 'Cincinnati',
    'PIT': 'Pittsburgh',
    'CLE': 'Cleveland',
    'IND': 'Indianapolis',
    'DET': 'Detroit',
    'TB': 'Tampa Bay',
    'JAC': 'Jacksonville',
    'HOU': 'Houston',
    'MIA': 'Miami',
    'BAL': 'Baltimore',
    'MIN': 'Minnesota',
    'NYJ': 'N.Y. Jets',
    'NO': 'New Orleans',
    'CAR': 'Carolina',
    'TEN': 'Tennessee',
    'NYG': 'N.Y. Giants',
    'WAS': 'Washington',
    'STL': 'St. Louis',
    'ARI': 'Arizona',
    'KC': 'Kansas City',
    'DEN': 'Denver',
    'BUF': 'Buffalo',
    'OAK': 'Oakland',
    'SF': 'San Francisco',
    'PHI': 'Philadelphia',
    'SEA': 'Seattle',
    'SD': 'San Diego',
    'NE': 'New England',
    'GB': 'Green Bay',
    'ATL': 'Atlanta'
}


class LiveScoresScraper:
    def __init__(self):
        self.url = 'http://www.nfl.com/liveupdate/scores/scores.json'

    def scrape(self):
        r = requests.get(self.url)
        _scores_data = r.json()
        for _game_id in _scores_data:
            _game = _scores_data[_game_id]
            _home = _game['home']
            _away = _game['away']
            home_score = _game['home']['score']['T']
            away_score = _game['away']['score']['T']
            home = NFL_DOT_COM_TEAM_MAPPINGS[_home['abbr']]
            away = NFL_DOT_COM_TEAM_MAPPINGS[_away['abbr']]
            current_week = 16
            result_set = session.query(Game.id).filter_by(week=current_week, home=home).first()
            if result_set is not None:
                game = Game(id=result_set[0], home_score=home_score, away_score=away_score)
            else:
                game = Game(home=home, week=current_week, away=away, away_score=away_score, home_score=home_score)
            session.merge(game)
            session.commit()


PINNACLE_TEAM_MAPPINGS = {
    'Chicago Bears': 'Chicago',
    'Dallas Cowboys': 'Dallas',
    'Cincinnati Bengals': 'Cincinnati',
    'Pittsburgh Steelers': 'Pittsburgh',
    'Cleveland Browns': 'Cleveland',
    'Indianapolis Colts': 'Indianapolis',
    'Detroit Lions': 'Detroit',
    'Tampa Bay Buccaneers': 'Tampa Bay',
    'Jacksonville Jaguars': 'Jacksonville',
    'Houston Texans': 'Houston',
    'Miami Dolphins': 'Miami',
    'Baltimore Ravens': 'Baltimore',
    'Minnesota Vikings': 'Minnesota',
    'New York Jets': 'N.Y. Jets',
    'New Orleans Saints': 'New Orleans',
    'Carolina Panthers': 'Carolina',
    'Tennessee Titans': 'Tennessee',
    'New York Giants': 'N.Y. Giants',
    'Washington Redskins': 'Washington',
    'St. Louis Rams': 'St. Louis',
    'Arizona Cardinals': 'Arizona',
    'Kansas City Chiefs': 'Kansas City',
    'Denver Broncos': 'Denver',
    'Buffalo Bills': 'Buffalo',
    'Oakland Raiders': 'Oakland',
    'San Francisco 49ers': 'San Francisco',
    'Philadelphia Eagles': 'Philadelphia',
    'Seattle Seahawks': 'Seattle',
    'San Diego Chargers': 'San Diego',
    'New England Patriots': 'New England',
    'Green Bay Packers': 'Green Bay',
    'Atlanta Falcons': 'Atlanta'
}

class LinesScraper:
    def __init__(self):
        self.url = 'http://www.pinnaclesports.com/League/Football/NFL/1/Lines.aspx'

    def scrape(self):
        r = requests.get(self.url)
        soup = BeautifulSoup(r.text)
        spreads = soup.find_all('td', {'class': 'linesSpread'})
        teams = soup.find_all('td', {'class': 'linesTeam'})
        current_week = 16
        for i, elem in enumerate(teams):
            if i % 2 == 0:
                _away = elem.text.encode("ascii", "replace").split('?')[0]
                if _away in PINNACLE_TEAM_MAPPINGS:
                    away = PINNACLE_TEAM_MAPPINGS[_away]
            else:
                _home = elem.text.encode("ascii", "replace").split('?')[0]
                if _home in PINNACLE_TEAM_MAPPINGS:
                    home = PINNACLE_TEAM_MAPPINGS[_home]
                    spread = spreads[i].text.encode("ascii", "replace").split('?')[0].replace('+', '')
                    result_set = session.query(Game.id).filter_by(week=current_week, home=home).first()
                    if result_set is not None:
                        print 'update'
                        game = Game(id=result_set[0], spread=spread)
                    else:
                        print 'create'
                        game = Game(home=home, away=away, week=current_week, spread=spread)
                    session.merge(game)
                    session.commit()


if __name__ == '__main__':
    main()
