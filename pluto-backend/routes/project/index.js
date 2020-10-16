const express = require('express');
const router = express.Router();
const db = require('../../sequelize');
const passport = require('passport');
const logger = require('../../utils/logger');
const { API_MESSAGES } = require('../../constants');

/*
  @route: GET /project/user/:userId
  @desc: Get all projects of a user
  @access: public
*/
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const UserId = parseInt(userId, 10);
    if (isNaN(UserId)) {
      return res
        .status(400)
        .json({
          message: API_MESSAGES.INVALID_INPUT,
        });
    }
    const Project = db.models.Project;
    const foundProjects = await Project.findAll({
      where: {
        UserId
      }
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

/*
  @route: GET /project/:projectId
  @desc: Get a project by id
  @access: public
*/
router.get('/:projectId', async (req, res) => {
  try {
    const { projectId } = req.params;
    const id = parseInt(projectId, 10);
    if (isNaN(id)) {
      return res
        .status(400)
        .json({
          message: API_MESSAGES.INVALID_INPUT,
        });
    }
    const Project = db.models.Project;
    const foundProject = await Project.findByPk(id);
    if (foundProject == null) {
      return res
        .status(404)
        .json({
          message: API_MESSAGES.NOT_FOUND
        });
    }
    return res
      .status(200)
      .json({
        project: foundProject.get({ plain: true })
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

/*
  @route: POST /project/
  @desc: Create a project
  @access: private
*/
router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const { name, url, shortDesc, longDesc } = req.body;
    const { id: UserId } = req.user;
    const Project = db.models.Project;
    const project = await Project.create({
      name,
      url,
      shortDesc,
      longDesc,
      UserId
    });
    return res
      .status(200)
      .json({
        project: project.get({ plain: true })
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

/*
  @route: PATCH /project/
  @desc: Update a project
  @access: private
*/
router.patch('/:projectId', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const { projectId } = req.params;
    const id = parseInt(projectId, 10);
    if (isNaN(id)) {
      return res
        .status(400)
        .json({
          message: API_MESSAGES.INVALID_INPUT,
        });
    }
    const Project = db.models.Project;
    const foundProject = await Project.findByPk(id);
    if (foundProject == null) {
      return res
        .status(404)
        .json({
          message: API_MESSAGES.NOT_FOUND,
        });
    }
    const projectData = foundProject.get({ plain: true });
    const { id: UserId } = req.user;
    if (projectData.UserId !== UserId) {
      return res
        .status(401)
        .json({
          message: API_MESSAGES.NOT_AUTHORIZED,
        })
    }
    const newProjectData = req.body;
    // Don't allow these fields to be updated.
    delete newProjectData['id'];
    delete newProjectData['likes'];
    delete newProjectData['comments'];
    const updatedProject = await foundProject.update({
      ...projectData,
      ...newProjectData,
    })
    return res
      .status(200)
      .json({
        project: updatedProject.get({ plain: true }),
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

/*
  @route: DELETE /project/
  @desc: Delete a project
  @access: private
*/
router.delete('/:projectId', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const { projectId } = req.params;
    const id = parseInt(projectId, 10);
    if (isNaN(id)) {
      return res
        .status(400)
        .json({
          message: API_MESSAGES.INVALID_INPUT,
        })
    }
    const Project = db.models.Project;
    const foundProject = await Project.findByPk(id);
    if (foundProject == null) {
      return res
        .status(404)
        .json({
          message: API_MESSAGES.NOT_FOUND,
        })
    }
    const projectData = foundProject.get({ plain: true });
    const { id: UserId } = req.user;
    if (projectData.UserId !== UserId) {
      return res
        .status(401)
        .json({
          message: API_MESSAGES.NOT_AUTHORIZED,
        })
    }
    await foundProject.destroy();
    return res
      .status(200)
      .json({
        message: API_MESSAGES.SUCCESSFULLY_DELETED,
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