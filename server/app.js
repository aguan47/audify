require('dotenv').config({path: `./.env.${process.env.NODE_ENV}`});
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const fs = require('fs');
const app = express();
const { errorHandler } = require('./middleware/ErrorHandling.js');

// Create 'audio' folder if it doesn't exists
if (!fs.existsSync('./audio')) {
  fs.mkdirSync('./audio');
}

// Import all of the routes specified in the routes folder
const userRoutes = require('./api/routes/Users.js');
const journalRoutes = require('./api/routes/Journals.js');

// use these middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(compression());


// Use all of the routes specified
app.use('/users', userRoutes);
app.use('/journals', journalRoutes);

// Error Handling goes here.
app.use(errorHandler);

// Serve static images and audios
app.use('/images', express.static(__dirname + '/images'))
app.use('/audio', express.static(__dirname + '/audio'));
    
// Start listening
if (process.env.NODE_ENV === "production") {
    app.listen(process.env.PORT, () =>
      console.log(
        `Listening on port ${process.env.PORT}, ${process.env.NODE_ENV} build`
      )
    );
  } else {
    app.listen(process.env.PORT, () =>
      console.log(
        `Listening on port ${process.env.PORT}, ${process.env.NODE_ENV} build`
      )
    );
  }
