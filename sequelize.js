const { Sequelize } = require('sequelize');

// Connect to the database
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'mysql',
    define: {
      freezeTableName: true, // stop the auto-pluralization performed by Sequelize
    }
  }
);

// All models
const modelsDefinition = [
  require('./models/user.model'),
  require('./models/project.model'),
]

for (const modelDefinition of modelsDefinition) {
  // Pass connection to this model definition
  modelDefinition(sequelize)
}

// Associations
const { User, Project } = sequelize.models;
User.hasMany(Project, {
  foreignKey: {
    allowNull: false
  }
});

// Sync to DB
// sequelize.sync({ force: true });
sequelize.sync({ force: false });

// Export the connection
module.exports = sequelize;
