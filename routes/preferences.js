const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const USER = {"uid": 1, "full_name": "test-user", "grade": 4.0, "phone_number": 89877};
const COURSE = {"cid": 1, "name": "CSE666", "grade": 4.0};
const USER_TABLE = {"users": [USER, USER, USER]};
const COURSE_TABLE = {"courses": [COURSE, COURSE, COURSE]};

router.get('', (req, res, next) => {
    let cid = req.query.cid;
    let uid = req.query.uid;
    if (cid && uid) {
        res.status(200).json(COURSE);
    } else if (cid) {
        res.status(200).json(USER_TABLE);
    } else if (uid) {
        res.status(200).json(COURSE_TABLE);
    } else if (Object.keys(req.query).length === 0) {
        res.status(200).json({success: true, msg: "Ok! You must be an admin!"});
    } else {
        res.status(400).json({success: false, msg: "Unknow parameter!"});
    }
    
});

router.post('/add', (req, res, next) => {
    res.status(200).json({success: true, msg: "Ok!"});
});

router.post('/remove', (req, res, next) => {
    res.status(200).json({success: true, msg: "Ok!"});
});

router.post('/edit', (req, res, next) => {
    res.status(200).json({success: true, msg: "Ok!"});
});

module.exports = router;