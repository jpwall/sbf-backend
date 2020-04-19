const pgp = require('pg-promise')({
    // Initialization Options
});
const cn = process.env.DATABASE_URL;
const db = pgp(cn);

module.exports.getAllCourses = (callback) => {
    const query = `SELECT cid, subject_name FROM Courses`;
    db.manyOrNone(query)
        .then((res) => {
            callback(null, res);
        })
        .catch((err) => {
            callback(err, false);
        });
};

module.exports.getCourseById = (id, callback) => {
    const query = `SELECT * FROM Courses WHERE cid=$1`;
    db.one(query, [id]);
};

module.exports.addCourse = (name, description, callback) => {
    const query = `INSERT INTO Courses (subject_name, description) VALUES ($1, $2) RETURNING *`;
    db.one(query, [name, description])
        .then((res) => {
            callback(null, res);
        })
        .catch((err) => {
            callback(err, false);
        });
};
