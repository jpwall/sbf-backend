const express = require('express');
const server = express();
const PORT = process.env.PORT || 3000;
const { Pool, Client } = require('pg');
const cors = require('cors');

const db = new Client({
    connectionString: process.env.DATABASE_URL
})

server.use(cors());

db.connect(err => {
    if (err) {
      console.error('connection error', err.stack)
    } else {
        console.log('connected')
    }
})

server.listen(PORT, () => console.log(`Server running on ${PORT}`)); 

server.get('/users', async (req, res) => {
    try {
        let result = await db.query("SELECT * FROM Users;");
        res.status(200).send(result.rows);
    } catch (err) {
        res.status(400).send("There was an error fetching the data.");
    }
});

server.get('/insert-user', async (req, res) => {
    try {
        let result = await db.query("INSERT INTO Users (full_name, email, pw) VALUES ('Andrei K.', 'ak97@uw.edu', 'p1');");
        res.status(200).send("Successfully added user!");
    } catch (err) {
        res.status(400).send(err);
    }
});

server.get('/courses', async (req, res) => {
    res.status(200).send(['course one', 'course two']);
})

