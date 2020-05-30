const pgp = require('pg-promise')({
    // Initialization Options
});
const cn = process.env.DATABASE_URL;
const db = pgp(cn);

module.exports.getUsersInCourse = (cid, callback) => {
    const query = `SELECT u.full_name, u.phone_number, p.min_grade FROM Users u INNER JOIN Preferences p ON u.uid = p.uid WHERE p.cid = $1`;
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

module.exports.isUserInCourse = (uid, cid, callback) => {
    const query = `SELECT CASE WHEN EXISTS (SELECT * FROM Preferences WHERE uid=$1 AND cid=$2) THEN CAST(1 AS BIT) ELSE CAST(0 AS BIT) END`;
    db.oneOrNone(query, [uid, cid])
	.then((res) => {
	    callback(null, res);
	})
	.catch((err) => {
	    callback(err, false);
	});
};

module.exports.removeUserFromCourse = (uid, cid, callback) => {
    const query = `DELETE FROM Preferences WHERE uid=$1 AND cid=$2`;
    db.one(query, [uid, cid])
	.then((res) => {
	    callback(null, res);
	})
	.catch((err) => {
	    callback(err, false);
	});
};
