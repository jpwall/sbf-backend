const pgp = require('pg-promise')({
    // Initialization Options
});
const cn = process.env.DATABASE_URL;
const db = pgp(cn);

module.exports.getUsersInCourse = (cid, callback) => {
    const query = `SELECT full_name, phone_number, min_grade FROM Users, Preferences WHERE Preferences.cid=$1`;
    db.manyOrNone(query, [cid])
        .then((res) => {
            callback(null, res);
        })
        .catch((err) => {
            callback(err, false);
        });
};

module.exports.addUserToCourse = (uid, cid, minGrade, callback) => {
    const query = `INSERT INTO Preferences (uid, cid, min_grade) VALUES ($1, $2, $3) RETURNING *`;
    db.one(query, [uid, cid, minGrade])
        .then((res) => {
            callback(null, res);
        })
        .catch((err) => {
            callback(err, false);
        });
};
