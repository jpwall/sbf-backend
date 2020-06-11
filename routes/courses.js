const express = require('express');
const router = express.Router();
const Course = require('../models/course');
const passport = require('passport');
const jwt = require('jsonwebtoken');

router.post('/search', (req, res, next) => {
    if (req.body.search.length >=3) {
        Course.searchAllCourses(req.body.search, (err, data) => {
            if (err) {
                res.status(400).json({success: false, err: err});
            } else {
                res.status(200).json(data);
            }
        });
    } else {
        res.status(400).json({success: false, msg: 'Please search for courses by using at least three characters'});
    }
});

router.get('/get', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    var cid = req.query.cid;
    Course.getCourseById(cid, (err, data) => {
        if (err) {
            res.status(400).json({success: false, msg: "Error retrieving course information."});
        } else {
            res.status(200).json(data);
        }
    });
});

module.exports = router;
