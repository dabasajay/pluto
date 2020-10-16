const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Comment', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    text: {
      type: DataTypes.STRING(200), // VARCHAR(255)
      allowNull: false,
      validate: {
        len: [10,200]
      }
    },
  });
};