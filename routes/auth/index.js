const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../../sequelize');
const logger = require('../../utils/logger');

/*
  @route: POST /auth/
  @desc: Authenticate a user using credentials
  @access: public
*/
router.post('/', async (req, res) => {
  try {
    const { username, password } = req.body;
    const User = db.models.User;
    const foundUser = await User.findOne({
      where: {
        username
      }
    });
    if (foundUser == null) {
      return res.status(200).send('Account does not exists!')
    }
    const user = foundUser.get({ plain: true });
    const isMatch = await bcrypt.compare(password, user.password)
    if (isMatch) {
      const expireInHours = 6;
      const payload = {
        id: user.id,
        username: user.username
      };
      jwt.sign(payload, process.env.JWT_CODE, { expiresIn: expireInHours * 3600 }, (err, accessToken)=>{
        if(err){
          throw new Error('Error in signing JWT token.');
        } else {
          return res.status(200).json({ accessToken })
        }
      });
    } else {
      return res.status(401).send('Wrong password!')
    }
  } catch (err) {
    logger.error(err.stack);
    res.status(400).send('Error logging in!')
  }
});

module.exports = router;