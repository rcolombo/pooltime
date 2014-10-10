#!/usr/bin/env python

# games table
print '''CREATE SEQUENCE games_id_seq;'''
print '''
  CREATE TABLE games (
      id INTEGER PRIMARY KEY DEFAULT NEXTVAL('games_id_seq'),
      week INTEGER,
      home VARCHAR(32),
      away VARCHAR(32),
      home_score INTEGER,
      away_score INTEGER,
      spread FLOAT
  ); '''
print ''' CREATE UNIQUE INDEX ix_games_week_home ON games (week, home); '''

# users table
print '''CREATE SEQUENCE users_id_seq;'''
print '''
  CREATE TABLE users (
      id INTEGER PRIMARY KEY DEFAULT NEXTVAL('users_id_seq'),
      name VARCHAR(32)
  ); '''

# selections table
print '''
  CREATE TABLE selections (
      game_id INTEGER,
      user_id INTEGER,
      team VARCHAR(32),
      PRIMARY KEY(game_id, user_id)
  ); '''
