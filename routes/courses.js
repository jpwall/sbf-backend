const express = require('express');
const router = express.Router();
const Course = require('../models/course');
const passport = require('passport');
const jwt = require('jsonwebtoken');

router.get('', (req, res, next) => {
    Course.getAllCourses((err, data) => {
        if (err) {
            res.status(400).json({success: false, err: err});
        } else {
            res.status(200).json(data);
        }
    });
});

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

router.get('/get', (req, res, next) => {
    var cid = req.query.cid;
    Course.getCourseById(cid, (err, data) => {
        if (err) {
            res.status(400).json({success: false, msg: "Error retrieving course information."});
        } else {
            res.status(200).json(data);
        }
    });
});

router.post('/add', (req, res, next) => {
    Course.addCourse(req.body.name.toUpperCase().replace(/\s/g, ''), req.body.description, (err, data) => {
        if (err) {
            res.status(400).json({success: false, msg: "Course already exists!"});
        } else {
            res.status(200).json({success: true, msg: "Ok!"});
        }
    });
});

router.post('/remove', (req, res, next) => {
    res.status(200).json({success: true, msg: "Ok!"});
});

router.post('/edit', (req, res, next) => {
    res.status(200).json({success: true, msg: "Ok!"});
});

module.exports = router;
