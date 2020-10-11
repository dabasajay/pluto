const express = require('express');
const router = express.Router();

// For all routes: `/auth/<>`
router.use('/auth', require('./auth/'));

// For all routes: `/user/<>`
router.use('/user', require('./user/'));

// For all routes: `/profile/<>`
router.use('/profile', require('./profile/'));

module.exports = router;