const express = require('express');
const router = express.Router();
const db = require('../../sequelize');
const { API_MESSAGES } = require('../../constants');

/*
  @route: GET /agg/countuserproject
  @desc: Get users and projects count
  @access: public
*/
router.get('/count/userandproject', async (req, res) => {
  try {
    const User = db.models.User;
    const Project = db.models.Project;
    const users = await User.count();
    const projects = await Project.count();
    return res
      .status(200)
      .json({
        users,
        projects,
      });
  } catch (err) {
    logger.error(err.stack);
    return res
      .status(400)
      .json({
        message: API_MESSAGES.UNKNOWN_ERROR
      });
  }
});

module.exports = router;