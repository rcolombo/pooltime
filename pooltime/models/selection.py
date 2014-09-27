from sqlalchemy.ext.declarative import declarative_base

from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Column
from sqlalchemy import UniqueConstraint
from sqlalchemy import PrimaryKeyConstraint


Base = declarative_base()

class Selection(Base):
    __tablename__ = 'selections'

    game_id = Column(Integer, nullable=False, primary_key=True)
    user_id = Column(Integer, primary_key=True)
    team = Column(String(32))

