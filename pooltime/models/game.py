from sqlalchemy.ext.declarative import declarative_base

from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Column

Base = declarative_base()

class Game(Base):
    __tablename__ = 'games'

    id = Column(Integer, primary_key=True)
    week = Column(Integer, nullable=False)
    away = Column(String(32), nullable=False)
    home = Column(String(32), nullable=False)
    away_pts = Column(Integer, nullable=False)
    home_pts = Column(Integer, nullable=False)
