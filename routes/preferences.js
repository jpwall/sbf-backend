const express = require('express');
const router = express.Router();
const Preference = require('../models/preference');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const USER = {"full_name": "John Doe", "phone_number": "12069793532", min_grade: "3.5"};
const COURSE = {"cid": 1, "name": "CSE666", "grade": 4.0};
const USER_TABLE = {"users": [USER, USER, USER]};
const COURSE_TABLE = {"courses": [COURSE, COURSE, COURSE]};

router.get('', (req, res, next) => {
    let cid = req.query.cid;
    let uid = req.query.uid;
    if (cid && uid) {
        res.status(200).json(COURSE);
    } else if (cid) {
        Preference.getUsersInCourse(cid, (err, data) => {
            if (err) {
                res.status(400).json({success: false, err: err});
            } else {
                res.status(200).json(data);
            }
        });
    } else if (uid) {
        res.status(200).json(COURSE_TABLE);
    } else if (Object.keys(req.query).length === 0) {
        res.status(200).json({success: true, msg: "Ok! You must be an admin!"});
    } else {
        res.status(400).json({success: false, msg: "Unknow parameter!"});
    }
    
});

router.post('/add', (req, res, next) => {
    Preference.addUserToCourse(req.body.uid, req.body.cid, req.body.minGrade, (err, data) => {
        if (err) {
            res.status(400).json({success: false, msg: "You are already in this course!"});
        } else {
            res.status(200).json({success: true, msg: "Ok!"});
        }
    });
});

router.post('/check', (req, res, next) => {
    Preference.isUserInCourse(req.body.uid, req.body.cid, (err, data) => {
	if (err) {
	    res.status(400).json({success: false, msg: "Error checking if user is in course"});
	} else {
	    res.status(200).json({success: true, msg: data});
	}
    });
});

router.post('/remove', (req, res, next) => {
    Preference.removeUserFromCourse(req.body.uid, req.body.cid, (err, data) => {
	if (err) {
	    res.status(400).json({success: false, msg: "Failed to delete user entry from course!"});
	} else {
	    res.status(200).json({success: true, msg: "Ok!"});
	}
    });
});

router.post('/edit', (req, res, next) => {
    res.status(200).json({success: true, msg: "Ok!"});
});

module.exports = router;
