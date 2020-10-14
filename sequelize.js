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
  require('./models/comment.model'),
];

for (const modelDefinition of modelsDefinition) {
  // Pass connection to this model definition
  modelDefinition(sequelize)
}

// Associations
const { User, Project, Comment } = sequelize.models;

Project.belongsTo(User, {
  foreignKey: {
    name: 'UserId',
    allowNull: false,
  }
});

Comment.belongsTo(User, {
  foreignKey: {
    name: 'UserId',
    allowNull: false,
  }
});

Comment.belongsTo(Project, {
  foreignKey: {
    name: 'ProjectId',
    allowNull: false,
  }
});

User.belongsToMany(Project, {
  through: 'User_likes_Project',
  foreignKey: {
    name: 'UserId',
    allowNull: false,
  }
});

Project.belongsToMany(User, {
  through: 'User_likes_Project',
  foreignKey: {
    name: 'ProjectId',
    allowNull: false,
  }
});

// Sync to DB
// sequelize.sync({ force: true });
sequelize.sync({ force: false });

// Export the connection
module.exports = sequelize;
