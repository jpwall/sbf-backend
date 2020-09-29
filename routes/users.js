const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const accountSid = process.env.TWILIO_ACCT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceId = process.env.TWILIO_STUDIUS_SID;
const twilio = require('twilio')(accountSid, authToken);

router.post('/register', (req, res, next) => {
    if ((req.body.username.length >= 1 && req.body.username.length <= 25) || req.body.password.length <= 25) {
        User.addUser(req.body.name, req.body.username, req.body.password, req.body.phone, (err, user) => {
            if (err) {
                res.status(400).json({success: false, msg: "Failed to register! There is already an account with the specified username or phone number."});
            } else {
                res.status(200).json({success: true, msg: "Ok!"});
            }
        });
    } else {
        res.status(400).json({success: false, msg: "Please keep your username and password below 25 characters in length."});
    }
});

router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    if ((req.body.username.length >= 1 && req.body.username.length <= 25) || req.body.password.length <= 25) {
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
                                phone: user.phone_number,
                                verified: user.verified
                            }
                        });
                    } else {
                        res.status(400).json({success: false, msg: "Wrong Password!"});
                    }
                });
            }
        });
    } else {
        res.status(400).json({success: false, msg: "Please keep your username and password below 25 characters in length."});
    }
});

router.post('/verifySend', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    User.getPhoneByUser(req.user.uid, (err, data) => {
        if (err) {
            res.status(400).json({success: false, err: err});
        } else {
            if (data.phone_number == req.body.phone) {
                const phone = '+' + req.body.phone;
                twilio.verify.services(serviceId)
                    .verifications
                    .create({to: phone, channel: 'sms'})
                    .then(res.status(200).json({success: true, msg: "Verification code sent"}));
            } else {
                res.status(401).json({success: false, msg: "You are not allowed to verify the phone number for another user."});
            }
        }
    }); 
});

router.post('/verifyCheck', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    User.getPhoneByUser(req.user.uid, (err, data) => {
        if (err) {
            res.status(400).json({success: false, err: err});
        } else {
            if (data.phone_number == req.body.phone) {
                const phone = '+' + req.body.phone;
                const code = req.body.code;
                twilio.verify.services(serviceId)
                    .verificationChecks
                    .create({to: phone, code: code})
                    .then(verification_check => {
                        if (verification_check.status == "approved") {
                            User.updateVerify(req.user.uid, (err, data) => {
                                if (err) {
                                    res.status(400).json({success: false, msg: "Internal error. Please contact support."});
                                } else {
                                    const token = req.get('Authorization');
                                    res.status(200).json({
                                        success: true,
                                        token: token,
                                        user: {
                                            uid: req.user.uid,
                                            name: req.user.full_name,
                                            username: req.user.username,
                                            phone: req.user.phone,
                                            verified: true
                                        }
                                    });
                                }
                            });
                        } else {
                            res.status(400).json({success: false, msg: "Wrong verification code. Please try again."});
                        }
                    });
            } else {
                res.status(401).json({success: false, msg: "You are not allowed to verify the phone number for another user."});
            }
        }
    });
});

module.exports = router;
