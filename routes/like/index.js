const express = require('express');
const router = express.Router();
const db = require('../../sequelize');
const passport = require('passport');
const logger = require('../../utils/logger');
const { API_MESSAGES } = require('../../constants');

/*
  @route: GET /like/
  @desc: Get all projects liked by a user
  @access: private
*/
router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const { id: UserId } = req.user;
    const User = db.models.User;
    const Project = db.models.Project;
    const foundProjects = await User.findOne({
      where: {
        id: UserId
      },
      attributes: [],
      include: {
        model: Project,
        through: {
          attributes: []
        }
      }
    })
    const { Projects: likedProjects } = foundProjects.get({ plain: true });
    return res
      .status(200)
      .json({
        likedProjects
      });
  } catch (err) {
    logger.error(err.stack);
    return res
      .status(400)
      .json({
        message: API_MESSAGES.UNKNOWN_ERROR,
      });
  }
});

/*
  @route: POST /like/
  @desc: Like a project
  @access: private
*/
router.post('/:projectId', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const { projectId } = req.params;
    const ProjectId = parseInt(projectId, 10);
    if (isNaN(ProjectId)) {
      return res
        .status(400)
        .json({
          message: API_MESSAGES.INVALID_INPUT,
        });
    }
    const { id: UserId } = req.user;
    const Project = db.models.Project;
    const User_likes_Project = db.models.User_likes_Project;
    await db.transaction(async (t) => {
      await User_likes_Project.create({
        UserId,
        ProjectId,
      }, { transaction: t })
      // Increment likes count in the project row
      const foundProject = await Project.findByPk(ProjectId, { transaction: t });
      const projectData = foundProject.get({ plain: true });
      await foundProject.update({
        ...projectData,
        likes: projectData.likes + 1,
      }, { transaction: t });
    })
    return res
      .status(200)
      .json({
        message: 'Liked successfully!',
      });
  } catch (err) {
    logger.error(err.stack);
    return res
      .status(400)
      .json({
        message: API_MESSAGES.UNKNOWN_ERROR,
      });
  }
});

/*
  @route: POST /like/
  @desc: Remove like from project
  @access: private
*/
router.delete('/:projectId', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const { projectId } = req.params;
    const ProjectId = parseInt(projectId, 10);
    if (isNaN(ProjectId)) {
      return res
        .status(400)
        .json({
          message: API_MESSAGES.INVALID_INPUT,
        });
    }
    const { id: UserId } = req.user;
    const Project = db.models.Project;
    const User_likes_Project = db.models.User_likes_Project;
    const result = await db.transaction(async (t) => {
      const foundLike = await User_likes_Project.findOne({
        where: {
          UserId,
          ProjectId,
        }
      }, { transaction: t });
      if (foundLike == null) {
        return {
          status: 404,
          message: API_MESSAGES.NOT_FOUND,
        };
      }
      // Delete like
      await foundLike.destroy({ transaction: t });
      // Decrement likes count in the project row
      const foundProject = await Project.findByPk(ProjectId, { transaction: t });
      const projectData = foundProject.get({ plain: true });
      await foundProject.update({
        ...projectData,
        likes: projectData.likes - 1,
      }, { transaction: t });
      // Deleted successfully.
      return {
        status: 200,
        message: API_MESSAGES.SUCCESSFULLY_DELETED,
      };
    })
    return res
      .status(result.status)
      .json({
        message: result.message,
      });
  } catch (err) {
    logger.error(err.stack);
    return res
      .status(400)
      .json({
        message: API_MESSAGES.UNKNOWN_ERROR,
      });
  }
});

module.exports = router;