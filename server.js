// Express Set Up
const express = require('express');
const server = express();
const PORT = process.env.PORT || 3000;

// PSQL Set Up
const {Client} = require('pg');
const db = new Client({
    connectionString: process.env.DATABASE_URL
});
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

// Users
const users = require('./routes/users');
server.use('/users', users);

// Courses
const courses = require('./routes/courses');
server.use('/courses', courses);

// Preferences
const preferences = require('./routes/preferences');
server.use('/preferences', preferences);

// Passport Middleware
const passport = require('passport');
server.use(passport.initialize());
server.use(passport.session())
require('./config/passport')(passport);

// Index route
server.get('/', (res, req) => {
    res.status(400).send("Invalid endpoint!");
})

server.listen(PORT, () => console.log(`Server running on ${PORT}`)); 

