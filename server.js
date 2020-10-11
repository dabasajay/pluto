// Load environment variables
require('dotenv-safe').config()

const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const app = express();
const passport = require('passport')
const passportConfig = require('./passportConfig');
const routes = require('./routes');
const logger = require('./utils/logger');
const sequelize = require('./sequelize');

// Compress all responses
app.use(compression());

// Parse the form data (application/x-www-form-urlencoded) and expose to req.body
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Config
passport.use(passportConfig);

// Passport middleware
app.use(passport.initialize());

// Connect to database
sequelize
  .authenticate()
  .then(() => {
    logger.info('Connected to database!');
  })
  .catch((err) => {
    logger.error('Unable to connect to the database!');
    logger.error(err.message);
    process.exit(1);
  });

// Routes
app.use(routes);

app.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json(req.headers);
})

// Any undefined route
app.use((req, res, next) => {
  logger.info(req.url);
  res.status(404).send("Page not found!");
})

// Error handler
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send("Internal server error!");
})

// Listen for requests
const server = app.listen(process.env.PORT, process.env.IP, () => {
  logger.info(`Server started on ${process.env.IP}:${process.env.PORT}`);
})

// Export server for testing
module.exports = server;