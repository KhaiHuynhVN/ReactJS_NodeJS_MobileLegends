// mongod --dbpath F:/mongoDB-data/db
const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 3111;

const route = require('./routes');
const db = require('./db/index');

// Connect DB
db.connect();

// HTTP logger
app.use(morgan('combined'));

// Define req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route init
route(app);

app.listen(port, () => {
   console.log(`Listening port ${port}`);
});
