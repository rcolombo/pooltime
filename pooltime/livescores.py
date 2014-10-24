import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
from eventlet.hubs import trampoline

class ScoreStreamer(object):
    def __init__(self):
        super(ScoreStreamer, self).__init__()

    """
    Generates a live stream of scores directly from persistence.
    """
    def stream(self):
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
                score_data = cnn.notifies.pop()
                score = parse_score_data(score_data)
                yield score

