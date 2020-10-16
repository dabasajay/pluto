const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Project', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: [2, 100]
      }
    },
    url: {
      type: DataTypes.TEXT,
      validate: {
        isUrl: true,
      }
    },
    shortDesc: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        len: [10,150]
      }
    },
    longDesc: {
      type: DataTypes.STRING(500),
      validate: {
        len: [10,500]
      }
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    comments: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    }
  });
};