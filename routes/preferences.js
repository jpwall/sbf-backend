const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

router.get('/get', (req, res, next) => {
    res.status(200).json({success: true, msg: "Ok!"});
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