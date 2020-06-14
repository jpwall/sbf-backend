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
        WHERE uid=$1`;
    db.oneOrNone(query, [id]);
}

module.exports.getUserByUsername = (username, callback) => {
    const query = `
        SELECT * 
        FROM Users
        WHERE username=$1`;
    db.oneOrNone(query, [username])
        .then((res) => {
            callback(null, res);
        })
        .catch((err) => {
            callback(err, false);
        });
}

module.exports.addUser = (name, username, password, phone, callback) => {
    var verified = 'false';
    const query = `
        INSERT INTO Users
        (full_name, username, password, phone_number, verified)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`;
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;
            password = hash;
            db.one(query, [name, username, password, phone, verified])
                .then((res) => {
                    callback(null, res);
                })
                .catch((err) => {
                    callback(err, false);
                });
        });
    });
}

module.exports.remUser = (username, callback) => {
    const query = `DELETE FROM Users WHERE username=$1 RETURNING *`;
    db.one(query, [username])
        .then((res) => {
            callback(null, res);
        })
        .catch((err) => {
            callback(err, false);
        });
}

module.exports.comparePassword = (candidatePassword, hash, callback) => {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
}
