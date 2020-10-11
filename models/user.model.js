const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING, // VARCHAR(255)
      allowNull: false,
      unique: true,
      validate: {
        isAlphanumeric: true,
        len: [8,100]
      }
    },
    password: {
      type: DataTypes.STRING, // VARCHAR(255)
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING, // VARCHAR(255)
      allowNull: false,
      validate: {
        isAlpha: true,
        len: [2,100]
      }
    }
  });
};