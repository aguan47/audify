-- Create database and connect to that database
CREATE DATABASE audify;
\c audify

/* Create an extension for UUID */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    user_id UUID NOT NULL DEFAULT uuid_generate_v4(),
    user_name TEXT NOT NULL,
    user_email TEXT UNIQUE NOT NULL,
    password TEXT NULL,
    birthday DATE NOT NULL,
    bio VARCHAR(200) NULL,
    join_date DATE NOT NULL DEFAULT CURRENT_DATE,
    is_deleted INT NOT NULL DEFAULT 0,
    is_oauth INT NOT NULL DEFAULT 0,
    PRIMARY KEY (user_id)
);

CREATE TABLE journals (
    journal_id UUID NOT NULL,
    user_id UUID NOT NULL,
    create_date DATE NOT NULL DEFAULT CURRENT_DATE,
    last_modified TIMESTAMP NULL,
    caption VARCHAR(150) NULL,
    title VARCHAR(50) NULL,
    journal_path TEXT NOT NULL,
    is_deleted INT NOT NULL DEFAULT 0,
    is_edited INT NOT NULL DEFAULT 0,
    PRIMARY KEY (journal_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);