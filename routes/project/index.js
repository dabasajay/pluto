const express = require('express');
const router = express.Router();
const db = require('../../sequelize');
const passport = require('passport');
const logger = require('../../utils/logger');

/*
  @route: GET /project/
  @desc: Find all projects
  @access: public
*/
router.get('/', async (req, res) => {
  try {
    const Project = db.models.Project;
    const foundProjects = await Project.findAll({
      where: {
        ...req.query
      }
    });
    const projects = [];
    foundProjects.forEach(project => projects.push(project.get({ plain: true })));
    return res.status(200).json({
      projects
    })
  } catch (err) {
    logger.error(err.stack);
    res.status(400).send('Error fetching projects!')
  }
});

/*
  @route: GET /project/:projectID
  @desc: Get a project using id
  @access: public
*/
router.get('/:projectID', async (req, res) => {
  try {
    const { projectID } = req.params;
    const id = parseInt(projectID, 10);
    if (isNaN(id)) {
      return res.status(400).json({
        message: 'Invalid project id!'
      })
    }
    const Project = db.models.Project;
    const foundProject = await Project.findByPk(id);
    if (foundProject == null) {
      return res.status(404).send({
        message: 'Project does not exist!'
      })
    }
    return res.status(200).json(foundProject.get({ plain: true }))
  } catch (err) {
    logger.error(err.stack);
    res.status(400).send('Error fetching project!')
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
    const project = await Project.create({ name, url, shortDesc, longDesc, UserId });
    return res.status(200).json(project.get({ plain: true }));
  } catch (err) {
    logger.error(err.stack);
    res.status(400).send('Error creating project!')
  }
});

/*
  @route: PATCH /project/
  @desc: Update a project
  @access: private
*/
router.patch('/:projectID', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const { projectID } = req.params;
    const id = parseInt(projectID, 10);
    if (isNaN(id)) {
      return res.status(400).json({
        message: 'Invalid project id!'
      })
    }
    const Project = db.models.Project;
    const foundProject = await Project.findByPk(id);
    if (foundProject == null) {
      return res.status(404).send({
        message: 'Project does not exist!'
      })
    }
    const projectData = foundProject.get({ plain: true });
    const { id: UserId } = req.user;
    if (projectData.UserId !== UserId) {
      return res.status(401).send({
        message: 'Unauthorized action! This project does not belong to you.'
      })
    }
    const updatedProject = await foundProject.update({
      ...projectData,
      ...req.body
    })
    return res.status(200).json(updatedProject.get({ plain: true }));
  } catch (err) {
    logger.error(err.stack);
    res.status(400).send('Error updating project!')
  }
});

/*
  @route: DELETE /project/
  @desc: Delete a project
  @access: private
*/
router.delete('/:projectID', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const { projectID } = req.params;
    const id = parseInt(projectID, 10);
    if (isNaN(id)) {
      return res.status(400).json({
        message: 'Invalid project id!'
      })
    }
    const Project = db.models.Project;
    const foundProject = await Project.findByPk(id);
    if (foundProject == null) {
      return res.status(404).send({
        message: 'Project does not exist!'
      })
    }
    const projectData = foundProject.get({ plain: true });
    const { id: UserId } = req.user;
    if (projectData.UserId !== UserId) {
      return res.status(401).send({
        message: 'Unauthorized action! This project does not belong to you.'
      })
    }
    await foundProject.destroy();
    return res.status(200).json({
      message: "Successfully deleted the project."
    });
  } catch (err) {
    logger.error(err.stack);
    res.status(400).send('Error updating project!')
  }
});

module.exports = router;