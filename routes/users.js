const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');

router.post('/register', (req, res, next) => {
    User.addUser(req.body.name, req.body.username, req.body.password, req.body.phone, (err, user) => {
        if (err) {
            res.status(400).json({success: false, msg: "Failed to register! There is already an account with the specified username or phone number."});
        } else {
            res.status(200).json({success: true, msg: "Ok!"});
        }
    });
});

router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if (err) {
            res.status(400).json({success: false, msg: "Could not connect to the database."});
        } else if (!user) {
            res.status(400).json({success: false, msg: "User not found."});
        } else {
            User.comparePassword(password, user.password, (err, isMatch) => {
                if (isMatch) {
                    const token = jwt.sign(user, process.env.SECRET, {
                        expiresIn: 604800
                    });

                    res.status(200).json({
                        success: true,
                        token: 'Bearer ' + token,
                        user: {
                            uid: user.uid,
                            name: user.full_name,
                            username: user.username,
                            verified: user.verified
                        }
                    });
                } else {
                    res.status(400).json({success: false, msg: "Wrong Password!"});
                }
            });
        }
    });
});

module.exports = router;
