const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        len: [2,50]
      }
    },
    avatar: {
      type: DataTypes.TEXT,
      validate: {
        isUrl: true,
      }
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        len: [4,50]
      }
    },
    password: { // Don't validate here. We're going to hash password in application login. Length range - [4,50]
      type: DataTypes.TEXT,
      allowNull: false,
    },
    bio: {
      type: DataTypes.STRING(150),
      validate: {
        len: [10,150]
      }
    },
    location: {
      type: DataTypes.STRING(100),
      validate: {
        len: [10,100]
      }
    },
    college: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: [2,100]
      }
    },
    website: {
      type: DataTypes.TEXT,
      validate: {
        isUrl: true,
      }
    },
    linkedin: {
      type: DataTypes.TEXT,
      validate: {
        isUrl: true,
      }
    },
    github: {
      type: DataTypes.TEXT,
      validate: {
        isUrl: true,
      }
    },
  });
};