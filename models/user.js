const pgp = require('pg-promise')({
    // Initialization Options
});
const cn = process.env.DATABASE_URL;
const db = pgp(cn);
const bcrypt = require('bcryptjs');

module.exports.getUserById = (id, callback) => {
    const query = `
        SELECT * 
        FROM Users
        WHERE uid=$1`
    db.oneOrNone(query, [id]);
}

module.exports.getUserByEmail = (email, callback) => {
    const query = `
        SELECT * 
        FROM Users
        WHERE email=$1`
    db.oneOrNone(query, [email])
        .then((res) => {
            callback(null, res);
        })
        .catch((err) => {
            callback(err, false);
        })
}

module.exports.addUser = (name, email, password, callback) => {
    const query = `
        INSERT INTO Users
        (full_name, email, password)
        VALUES ($1, $2, $3)
        RETURNING *`
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;
            password = hash;
            db.one(query, [name, email, password])
                .then((res) => {
                    callback(null, res);
                })
                .catch((err) => {
                    callback(err, false);
                })
        })
    })
}

module.exports.comparePassword = (candidatePassword, hash, callback) => {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    })
}