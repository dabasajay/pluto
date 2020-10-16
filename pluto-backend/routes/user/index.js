const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../../sequelize');
const logger = require('../../utils/logger');
const { API_MESSAGES } = require('../../constants');

/*
  @route: GET /user/:userId
  @desc: Get a user by id
  @access: public
*/
router.get('/:userId', async (req, res) => {
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
    const User = db.models.User;
    const Project = db.models.Project;
    const foundUser = await User.findByPk(UserId, {
      include: Project
    });
    if (foundUser == null) {
      return res
        .status(404)
        .json({
          message: API_MESSAGES.NOT_FOUND
        });
    }
    const userData = foundUser.get({ plain: true });
    // Don't return password
    delete userData['password'];
    return res
      .status(200)
      .json({
        user: userData
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
  @route: POST /user/
  @desc: Create a new user
  @access: public
*/
router.post('/', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (password.length < 4 || password.length > 50) {
      return res
        .status(400)
        .json({
          message: API_MESSAGES.INVALID_INPUT,
        });
    }
    const User = db.models.User;
    const foundUser = await User.findOne({
      where: {
        username
      }
    });
    if (foundUser !== null) {
      return res
        .status(200)
        .json({
          message: API_MESSAGES.USER_ALREADY_EXISTS,
        })
    }
    bcrypt.hash(password, parseInt(process.env.ROUNDS), async function (err, hash) {
      try {
        if (err) {
          next(new Error('Error in bcrypt hash generation'));
        } else {
          const userData = req.body;
          // Don't allow id to be passed from user input.
          delete userData['id'];
          // Replace password with hash
          userData['password'] = hash;
          const user = await User.create(userData);
          const newUserData = user.get({ plain: true });
          // Don't return password
          delete newUserData['password'];
          // Get an access token for new user
          const expireInHours = 6;
          const payload = {
            id: user.id,
            username: user.username
          };
          jwt.sign(payload, process.env.JWT_CODE, { expiresIn: expireInHours * 3600 }, (err, accessToken)=>{
            if(err){
              throw new Error('Error in signing JWT token.');
            } else {
              return res
                .status(200)
                .json({
                  user: {
                    ...newUserData,
                    accessToken,
                  }
                });
            }
          });
        }
      } catch(err) {
        logger.error(err.stack);
        return res
          .status(400)
          .json({
            message: API_MESSAGES.UNKNOWN_ERROR
          });
      }
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
  @route: PATCH /user/credentials
  @desc: Update user credentials
  @access: private
*/
router.patch('/credentials', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  try {
    const { password: newPassword } = req.body;
    if (newPassword.length < 4 || newPassword.length > 50) {
      return res
        .status(400)
        .json({
          message: API_MESSAGES.INVALID_INPUT,
        });
    }
    const User = db.models.User;
    const { id } = req.user;
    const foundUser = await User.findByPk(id);
    const userData = foundUser.get({ plain: true });
    bcrypt.hash(newPassword, parseInt(process.env.ROUNDS), async function (err, hash) {
      try {
        if (err) {
          next(new Error('Error in bcrypt hash generation'));
        } else {
          const updatedUser = await foundUser.update({
            ...userData,
            password: hash,
          })
          const updatedUserData = updatedUser.get({ plain: true });
          // Don't return password
          delete updatedUserData['password'];
          return res
            .status(200)
            .json({
              user: updatedUserData,
            });
        }
      } catch(err) {
        logger.error(err.stack);
        return res
          .status(400)
          .json({
            message: API_MESSAGES.UNKNOWN_ERROR
          });
      }
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
  @route: PATCH /user/details
  @desc: Update user details
  @access: private
*/
router.patch('/details', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  try {
    const User = db.models.User;
    const { id } = req.user;
    const foundUser = await User.findByPk(id);
    const userData = foundUser.get({ plain: true });
    const newUserData = req.body;
    // Don't allow these fields to be updated.
    delete newUserData['id'];
    delete newUserData['username'];
    delete newUserData['password'];
    const updatedUser = await foundUser.update({
      ...userData,
      ...newUserData,
    });
    const updatedUserData = updatedUser.get({ plain: true });
    // Don't return password
    delete updatedUserData['password'];
    return res
      .status(200)
      .json({
        user: updatedUserData,
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