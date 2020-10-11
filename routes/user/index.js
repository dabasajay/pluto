const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const db = require('../../sequelize');
const logger = require('../../utils/logger');

/*
  @route: /user/
  @desc: Create a new user
  @access: public
*/
router.post('/', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  try {
    const { name, username, password } = req.body;
    const User = db.models.User;
    const foundUser = await User.findOne({
      where: {
        username
      }
    });
    if (password.length < 8 || password.length > 60) {
      return res.status(400).send('Invalid password!')
    }
    if (foundUser !== null) {
      return res.status(200).send('User already exists!')
    }
    bcrypt.hash(password, parseInt(process.env.ROUNDS), async function (err, hash) {
      try {
        if (err) {
          next(new Error('Error in bcrypt hash generation'));
        } else {
          const user = await User.create({ name, username, password: hash });
          const response = user.get({ plain: true });
          // Don't return password
          delete response['password'];
          return res.status(200).json(response);
        }
      } catch(err) {
        logger.error(err.stack);
        return res.status(400).send('Error creating user!')
      }
    });
  } catch (err) {
    logger.error(err.stack);
    return res.status(400).send('Error creating user!')
  }
});

module.exports = router;