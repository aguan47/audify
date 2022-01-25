require('dotenv').config({path: `../.env.${process.env.NODE_ENV}`});


const knex = require('knex')({
    client: 'pg',
    connection: {
        host: "localhost",
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }
});

module.exports = knex;