const express = require('express');
const router = express.Router();
const db = require('../../sequelize');
const passport = require('passport');
const logger = require('../../utils/logger');
const { API_MESSAGES } = require('../../constants');

/*
  @route: GET /comment/:projectId
  @desc: Find all comments on a project
  @access: public
*/
router.get('/:projectId', async (req, res) => {
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
    const Comment = db.models.Comment;
    const User = db.models.User;
    const foundComments = await Comment.findAll({
      where: {
        ProjectId,
      },
      include: {
        model: User,
        attributes: ['name', 'username'],
      }
    });
    const comments = [];
    // Get objects in plain form.
    foundComments.forEach(comment => comments.push(comment.get({ plain: true })));
    return res
      .status(200)
      .json({
        comments
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
  @route: POST /comment/:projectID
  @desc: Add a comment to a project
  @access: private
*/
router.post('/:projectId', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const { text } = req.body;
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
    const Comment = db.models.Comment;
    const Project = db.models.Project;
    const comment = await db.transaction(async (t) => {
      // Add comment
      const comment = await Comment.create({
        text,
        UserId,
        ProjectId
      }, { transaction: t });
      // Increment comments count in the project row
      const foundProject = await Project.findByPk(ProjectId, { transaction: t });
      const projectData = foundProject.get({ plain: true });
      await foundProject.update({
        ...projectData,
        comments: projectData.comments + 1,
      }, { transaction: t });
      return comment;
    })
    res.status(200)
      .json({
        comment: comment.get({ plain: true })
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
  @route: PATCH /comment/:commentId
  @desc: Edit a comment by id
  @access: private
*/
router.patch('/:commentId', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const { commentId } = req.params;
    const CommentId = parseInt(commentId, 10);
    if (isNaN(CommentId)) {
      return res
        .status(400)
        .json({
          message: API_MESSAGES.INVALID_INPUT,
        });
    }
    const Comment = db.models.Comment;
    const foundComment = await Comment.findByPk(CommentId);
    if (foundComment == null) {
      return res
        .status(404)
        .json({
          message: API_MESSAGES.NOT_FOUND,
        });
    }
    const commentData = foundComment.get({ plain: true });
    const { id: UserId } = req.user;
    if (commentData.UserId !== UserId) {
      return res
        .status(401)
        .json({
          message: API_MESSAGES.NOT_AUTHORIZED,
        })
    }
    const { text } = req.body;
    const updatedComment = await foundComment.update({
      ...commentData,
      text,
    })
    return res
      .status(200)
      .json({
        comment: updatedComment.get({ plain: true }),
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
  @route: DELETE /comment/:commentId
  @desc: Delete a comment by id
  @access: private
*/
router.delete('/:commentId', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const { commentId } = req.params;
    const CommentId = parseInt(commentId, 10);
    if (isNaN(CommentId)) {
      return res
        .status(400)
        .json({
          message: API_MESSAGES.INVALID_INPUT,
        });
    }
    const { id: UserId } = req.user;
    const Comment = db.models.Comment;
    const Project = db.models.Project;
    // Start transaction
    const result = await db.transaction(async (t) => {
      const foundComment = await Comment.findByPk(CommentId, { transaction: t });
      if (foundComment == null) {
        return {
          status: 404,
          message: API_MESSAGES.NOT_FOUND,
        };
      }
      const commentData = foundComment.get({ plain: true });
      if (commentData.UserId !== UserId) {
        return {
          status: 401,
          message: API_MESSAGES.NOT_AUTHORIZED,
        };
      }
      const foundProject = await Project.findByPk(commentData.ProjectId, { transaction: t });
      // Delete comment
      await foundComment.destroy({ transaction: t });
      // Decrement comments count in the project row
      const projectData = foundProject.get({ plain: true });
      await foundProject.update({
        ...projectData,
        comments: projectData.comments - 1,
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