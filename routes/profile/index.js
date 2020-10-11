const express = require('express');
const router = express.Router();
const logger = require('../../utils/logger');

/*
  @route: /profile/
  @desc: create user profile
  @access: public
*/
router.post('/', (req, res) => {
  res.status(200).send('Profile')
});

module.exports = router;