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
