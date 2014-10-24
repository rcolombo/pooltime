import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
import threading
from eventlet.hubs import trampoline

class ScoreStreamer(object):
    def __init__(self):
        super(ScoreStreamer, self).__init__()
        self.game_listeners = {}

    """
    Simple listener on a particular game whose score is updated
    and update_event is set and reset upon a score update for the game.
    This behavior is controlled by the main stream
    """
    class GameListener(object):
        def __init__(self, game_id):
            self.game_id = game_id
            self.update_event = threading.Event()
            self.score = None

        def wait_for_score(self):
            self.update_event.wait()
            return self.score

    """
    Returns true if the streamer is listening for the game.
    """
    def is_listening(self, game_id):
        return self.game_listeners.has_key(game_id)

    """
    Retreives the GameListener for the game_id. If one does not
    exist yet, it creates it.
    """
    def game_listener(self, game_id):
        if not self.is_listening(game_id):
            self.game_listeners[game_id] = self.GameListener(game_id)
        return self.game_listeners[game_id]

    """
    A thread-safe generator for a particular game.
    """
    def game_stream(self, game_id):
        listener = self.game_listener(game_id)
        while True:
            yield listener.wait_for_score()

    """
    The main stream of scores. Listens to the db and manages any GameListener
    objects by updating their scores upon a db update. This should only be
    run on a single thread.
    """
    def stream(self):
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
                if self.is_listening(score['game_id']):
                    listener = self.game_listeners[score['game_id']]
                    listener.score = score
                    listener.update_event.set() # wakeup listeners
                    listener.update_event.clear() # reset listeners
