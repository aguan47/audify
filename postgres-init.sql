-- Create database and connect to that database
CREATE DATABASE audify;
\c audify

/* Create an extension for UUID */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    user_id UUID NOT NULL DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NULL,
    birthday DATE NOT NULL,
    bio VARCHAR(200) NULL,
    join_date DATE NOT NULL DEFAULT CURRENT_DATE,
    is_deleted INT NOT NULL DEFAULT 0,
    is_oauth INT NOT NULL DEFAULT 0,
    profile_picture_path TEXT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE journals (
    journal_id UUID NOT NULL DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    create_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_modified TIMESTAMP NULL,
    caption VARCHAR(150) NOT NULL,
    title VARCHAR(50) NOT NULL,
    journal_path TEXT NOT NULL,
    is_deleted INT NOT NULL DEFAULT 0,
    is_edited INT NOT NULL DEFAULT 0,
    PRIMARY KEY (journal_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);