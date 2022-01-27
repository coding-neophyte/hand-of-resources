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

DROP TABLE IF EXISTS favorite_fighters;

CREATE TABLE favorite_fighters (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL,
    style TEXT NOT NULL,
    wins INT NOT NULL,
    losses INT NOT NULL,
    hometown TEXT NOT NULL
);

DROP TABLE IF EXISTS monthly_expenses;

CREATE TABLE monthly_expenses (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    rent INT NOT NULL,
    phone INT NOT NULL,
    transportation INT NOT NULL,
    food INT NOT NULL,
    utilities INT NOT NULL,
    entertainment INT NOT NULL,
    savings INT NOT NULL
);

DROP TABLE IF EXISTS workouts;

CREATE TABLE workouts (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    workout_name TEXT NOT NULL,
    muscles_worked TEXT NOT NULL
);
