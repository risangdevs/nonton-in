'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ticket.belongsTo(models.Movie)
    }
  };
  Ticket.init({
    ticketNumber: DataTypes.STRING,
    ticketType: DataTypes.STRING,
    dateMovie: DataTypes.DATE,
    seatNumber: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Please chose seat number'
        }
      }
    },
    showTime: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please chose showtime date and time'
        }
      }
    },
    price: DataTypes.INTEGER,
    MovieId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Ticket',
    hooks: {
      beforeCreate: (instance) => {
        instance.ticketNumber = instance.seatNumber + instance.MovieId.padStart(5, "0") + formatDate(instance.showTime).split("-").join("");
        instance.ticketType = 'Pro'
      },
    }
  });
  return Ticket;
};