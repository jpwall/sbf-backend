const express = require('express');
const router = express.Router();

// Users
const users = require('./users');
router.use('/users', users);

// Courses
const courses = require('./courses');
router.use('/courses', courses);

// Preferences
const preferences = require('./preferences');
router.use('/preferences', preferences);

module.exports = router;