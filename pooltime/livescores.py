import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
import eventlet
from eventlet.hubs import trampoline

import threading

class ScoreListener(object):
    """
    Listens to the db for score updates and adds them to a self-managed queue,
    accessable through the q property.
    """
    def __init__(self):
        super(ScoreListener, self).__init__()
        print 'init'
        self.q = eventlet.Queue()

    def run(self):
        eventlet.spawn(self.listen)

    def listen(self):
        print 'run'
        def parse_score_data(notify_obj):
            scores = notify_obj.payload.split(',')
            game_id = int(scores[0].strip())
            home_score = int(scores[1].strip())
            away_score = int(scores[2].strip())
            return {
                'game_id': game_id,
                'home_score': home_score,
                'away_score': away_score
            }
        cnn = psycopg2.connect(database='pooltime')
        cnn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        cur = cnn.cursor()
        cur.execute('listen score_update;')
        while True:
            trampoline(cnn, read=True)
            cnn.poll()
            while cnn.notifies:
                print 'notifies'
                score_data = cnn.notifies.pop()
                print 'notifies.pop'
                score = parse_score_data(score_data)
                self.q.put(score)
