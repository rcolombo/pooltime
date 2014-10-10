from sqlalchemy.ext.declarative import declarative_base

from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Column

Base = declarative_base()

class Game(Base):
    __tablename__ = 'games'

    id = Column(Integer, primary_key=True)
    week = Column(Integer, nullable=False)
    home = Column(String(32), nullable=False)
    away = Column(String(32), nullable=False)
    spread = Column(Integer, nullable=False)

    def to_dict(self):
        return {'id': self.id,
                'week': self.week,
                'home': self.home,
                'away': self.away,
                'spread': self.spread,
                'home_score': self.home_score,
                'away_score': self.away_score,
        }

