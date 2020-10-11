const jwtStrategy	= require('passport-jwt').Strategy;
const extractJWT	= require('passport-jwt').ExtractJwt;
const db = require('./sequelize');
const isEmpty = require('./utils/isEmpty');

const User = db.models.User;

const passportConfig = new jwtStrategy({
  'jwtFromRequest': extractJWT.fromAuthHeaderAsBearerToken(),
  'secretOrKey': process.env.JWT_CODE
}, async (jwt_payload, verified) => {
  try {
    const { id: ID } = jwt_payload;

    if (isEmpty(ID)) {
      return verified(null, false);
    }

    const result = await User.findByPk(ID)

    if (result == null) {
      return verified(null, false);
    }

    const user = result.get({ plain: true })
    const { id, username } = user;

    return verified(null, { id, username });
  } catch (err) {
    return verified(err, false);
  }
});

module.exports = passportConfig;