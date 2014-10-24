import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
import threading
from eventlet.hubs import trampoline

"""
Simple listener on a particular game whose score is updated
and update_event is set and reset upon a score update for the game.
This behavior is controlled by the main stream
"""
class ScoreListener(object):
    def __init__(self):
        self.update_event = threading.Event()
        self.score = None

    def wait_for_score(self):
        self.update_event.wait()
        return self.score

class ScoreStreamer(object):
    def __init__(self):
        super(ScoreStreamer, self).__init__()
        self.score_listener = ScoreListener()

    """
    A thread-safe generator for a particular game.
    """
    def new_stream(self):
        while True:
            yield self.score_listener.wait_for_score()

    """
    The main stream of scores. Listens to the db and manages any GameListener
    objects by updating their scores upon a db update. This should only be
    run on a single thread.
    """
    def run(self):
        def _parse_score_data(notify_obj):
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
                score_data = cnn.notifies.pop()
                score = _parse_score_data(score_data)
                self.score_listener.score = score
                self.score_listener.update_event.set() # wakeup listeners
                self.score_listener.update_event.clear() # reset listeners
