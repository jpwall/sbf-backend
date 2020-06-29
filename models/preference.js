const pgp = require('pg-promise')({
    // Initialization Options
});
const cn = process.env.DATABASE_URL;
const db = pgp(cn);

module.exports.getUsersInCourse = (cid, callback) => {
    const query = `SELECT u.uid, u.full_name, u.phone_number, p.min_grade, p.course_role FROM Users u INNER JOIN Preferences p ON u.uid = p.uid WHERE p.cid = $1 ORDER BY p.min_grade DESC`;
    db.manyOrNone(query, [cid])
        .then((res) => {
            callback(null, res);
        })
        .catch((err) => {
            callback(err, false);
        });
};

module.exports.getCoursesByUser = (uid, callback) => {
    const query = `SELECT c.subject_name, p.min_grade, c.cid FROM Courses c INNER JOIN Preferences p ON p.cid = c.cid AND p.uid = $1`;
    db.manyOrNone(query, [uid])
        .then((res) => {
            callback(null, res);
        })
        .catch((err) => {
            callback(err, false);
        });
};

module.exports.addUserToCourse = (uid, cid, minGrade, courseRole, callback) => {
    const query = `INSERT INTO Preferences (uid, cid, min_grade, course_role) VALUES ($1, $2, $3, $4) RETURNING *`;
    db.one(query, [uid, cid, minGrade, courseRole])
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
    db.oneOrNone(query, [uid, cid])
	.then((res) => {
	    callback(null, res);
	})
	.catch((err) => {
	    callback(err, false);
	});
};
