const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Project', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING, // VARCHAR(255)
      allowNull: false,
      validate: {
        len: [2,100]
      }
    },
    url: {
      type: DataTypes.STRING, // VARCHAR(255)
      allowNull: false,
      validate: {
        isUrl: true,
      }
    },
    shortDesc: {
      type: DataTypes.STRING, // VARCHAR(255)
      allowNull: false,
      validate: {
        len: [10,100]
      }
    },
    longDesc: {
      type: DataTypes.STRING(1000), // VARCHAR(255)
      allowNull: false,
      validate: {
        len: [10,1000]
      }
    },
  });
};