CREATE TABLE IF NOT EXISTS users (
	id SERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	password VARCHAR(32) NOT NULL,
	email VARCHAR(255) NOT NULL,
	signup_ts TIMESTAMP WITH TIME ZONE DEFAULT NOW()
)