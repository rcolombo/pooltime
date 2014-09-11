from sqlalchemy.ext.declarative import declarative_base

from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Column

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    name = Column(String(32), nullable=False)
