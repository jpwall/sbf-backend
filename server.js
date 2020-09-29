// Express Set Up
const express = require('express');
const server = express();
const PORT = process.env.PORT || 3001;
//const pgp = require('pg-promise')();

// PSQL Set Up
const {Client} = require('pg');
const db = new Client({
    connectionString: process.env.DATABASE_URL
});
//const db = pgp(process.env.DATABASE_URL);
db.connect(err => {
    if (err) {
      console.error('connection error', err.stack)
    } else {
        console.log('connected')
    }
})

// CORS
const cors = require('cors');
server.use(cors());

// Body parser
const bodyParser = require('body-parser');
server.use(bodyParser.json());

// Api
const api = require('./routes/api');
server.use('/api', api);

// Passport Middleware
const passport = require('passport');
server.use(passport.initialize());
server.use(passport.session())
require('./config/passport')(passport);
require('dotenv').config();
// Index route
server.get('/', (res, req) => {
    res.status(400).send("Invalid endpoint!");
})

server.listen(PORT, () => console.log(`Server running on ${PORT}`)); 

