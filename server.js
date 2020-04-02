// Express Set Up
const express = require('express');
const server = express();
const PORT = process.env.PORT || 3000;

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

// Index route
server.get('/', (req, res) => {
    res.status(400).send("Invalid endpoint!");
})

server.get('/try', (req, res) => {
    res.status(200).json({message: "Helloo"});
})

server.listen(PORT, () => console.log(`Server running on ${PORT}`)); 

module.exports = server; // for testing
