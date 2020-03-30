const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');

router.post('/register', (req, res, next) => {
    User.addUser(req.body.name, req.body.email, req.body.password, (err, user) => {
        if (err) res.status(400).json({success: false, msg: "Failed to register user!"}); 
        else res.status(200).json({success: true, msg: "Ok!"});
    });
});

router.post('/authenticate', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.getUserByEmail(email, (err, user) => {
        if (err) {
            res.status(400).json({success: false, msg: "Could not connect to the database."});
        } else if (!user) {
            res.status(400).json({success: false, msg: "User not found."});
        } else {
            User.comparePassword(password, user.password, (err, isMatch) => {
                if (isMatch) {
                    const token = jwt.sign(user, process.env.SECRET, {
                        expiresIn: 604800
                    })

                    res.status(200).json({
                        success: true,
                        token: 'Bearer ' + token,
                        user: {
                            uid: user.uid,
                            name: user.full_name,
                            email: user.email
                        }
                    })
                } else {
                    res.status(400).json({success: false, msg: "Wrong Password!"});
                }
            })
        }
    })
})

router.get('/profile', passport.authenticate('jwt',{session:false}), (req, res, next) => {
    res.status(200).json({user: req.user});
});

module.exports = router;