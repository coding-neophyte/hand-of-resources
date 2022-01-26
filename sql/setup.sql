-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS music;

CREATE TABLE music (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    song_title TEXT NOT NULL,
    artist TEXT NOT NULL,
    album TEXT NOT NULL,
    genre TEXT NOT NULL
);

DROP TABLE IF EXISTS favorite_teams;

CREATE TABLE favorite_teams(
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    team_name TEXT NOT NULL,
    city TEXT NOT NULL,
    conference TEXT NOT NULL,
    championships INT NOT NULL
);
