'use strict';
const bcrypt = require('bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.ChatRoom)
    }
  };
  User.init({
    userName: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: "Username already in use, please choose a different username or login!"
      },
      validate: {
        notEmpty: {
          args: true,
          msg: "Username, must be filled!"
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: "Email already in use, please choose a different email or login!"
      },
      validate: {
        notEmpty: {
          args: true,
          msg: "Email, must be filled!"
        },
        isEmail: {
          args: true,
          msg: "Please use right email!"
        },
      },
    },
    role: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Password, must be filled!"
        },
        len: {
          args: [8, 16],
          msg: "Password must between 8 and 16"
        }
      },
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (instance) => {
        console.log(instance);
        instance.password = bcrypt.hashSync(instance.password, bcrypt.genSaltSync(5));
        instance.role = 'user'
      },
    }
  });
  return User;
};