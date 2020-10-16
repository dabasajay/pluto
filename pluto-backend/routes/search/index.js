const express = require('express');
const router = express.Router();
const db = require('../../sequelize');
const logger = require('../../utils/logger');
const { API_MESSAGES } = require('../../constants');

/*
  @route: GET /search/
  @desc: Get all projects using search query
  @access: public
*/
router.get('/', async (req, res) => {
  try {
    const Project = db.models.Project;
    const foundProjects = await Project.findAll({
      limit: 10,
    });
    const projects = [];
    // Get objects in plain form.
    foundProjects.forEach(project => projects.push(project.get({ plain: true })));
    return res
      .status(200)
      .json({
        projects
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