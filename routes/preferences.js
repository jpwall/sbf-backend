const express = require('express');
const router = express.Router();
const Preference = require('../models/preference');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const USER = {"full_name": "John Doe", "phone_number": "12069793532", min_grade: "3.5"};
const COURSE = {"cid": 1, "name": "CSE666", "grade": 4.0};
const USER_TABLE = {"users": [USER, USER, USER]};
const COURSE_TABLE = {"courses": [COURSE, COURSE, COURSE]};

router.get('', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    Preference.getUsersInCourse(req.query.cid, (err, data) => {
        if (err) {
            res.status(400).json({success: false, err: err});
        } else {
            res.status(200).json(data);
        }
    });
});

router.post('/userCourses', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    if (req.user.uid == req.body.uid) {
        Preference.getCoursesByUser(req.body.uid, (err, data) => {
            if (err) {
                res.status(400).json({success: false, msg: "Unable to retrieve your listed courses"});
            } else {
                res.status(200).json({success: true, msg: data});
            }
        });
    } else {
        res.status(401).json({success: false, msg: "You are not allowed to access data from another user."});
    }
});

router.post('/add', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    if (req.user.uid == req.body.uid) {
        Preference.addUserToCourse(req.body.uid, req.body.cid, req.body.minGrade, (err, data) => {
            if (err) {
                res.status(400).json({success: false, msg: "You are already in this course!"});
            } else {
                res.status(200).json({success: true, msg: "Ok!"});
            }
        });
    } else {
        res.status(401).json({success: false, msg: "You are not allowed to modify data for another user."});        
    }
});

router.post('/check', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    if (req.user.uid == req.body.uid) {
        Preference.isUserInCourse(req.body.uid, req.body.cid, (err, data) => {
	    if (err) {
	        res.status(400).json({success: false, msg: "Error checking if user is in course"});
	    } else {
	        res.status(200).json({success: true, msg: data});
	    }
        });
    } else {
        res.status(401).json({success: false, msg: "You are not allowed to access data from another user."});        
    }
});

router.post('/remove', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    if (req.user.uid == req.body.uid) {
        Preference.removeUserFromCourse(req.body.uid, req.body.cid, (err, data) => {
	    if (err) {
	        res.status(400).json({success: false, msg: "Failed to delete user entry from course!"});
	    } else {
	        res.status(200).json({success: true, msg: req.body.cid});
	    }
        });
    } else {
        res.status(401).json({success: false, msg: "You are not allowed to modify data for another user."});
    }
});

module.exports = router;
