var express = require('express');
var router = express.Router();
var { Pool, Client } = require('pg');

var sbf = new Pool({
  user: 'sbf',
  host: '10.1.10.11',
  database: 'sbf',
  password: 'password',
    port: 5432
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/courses', function(req, res, next) {
    var courseQuery = 'SELECT * FROM courses';
    sbf.query(courseQuery, (dbErr, dbRes) => {
	if (dbErr) {
	    console.log(dbErr);
	}
	var courses = [];
	for (var i = 0; i < dbRes.rows.length; i++) {
	    courses.push(dbRes.rows[i].name);
	}
	courses.sort();
	res.send(courses);
    });
});

module.exports = router;
