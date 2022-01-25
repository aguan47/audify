require('dotenv').config({path: `./.env.${process.env.NODE_ENV}`});
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const app = express();

// Import all of the routes specified in the routes folder
const userRoutes = require('./api/routes/Users.js');

// use these middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(compression());

// Use all of the routes specified
app.use('/users', userRoutes);


if (process.env.NODE_ENV !== "development") {
    console.log("production");
}

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT} running on ${process.env.NODE_ENV} env.`));