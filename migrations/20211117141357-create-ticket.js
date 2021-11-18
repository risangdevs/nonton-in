'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Tickets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ticketNumber: {
        type: Sequelize.STRING
      },
      ticketType: {
        type: Sequelize.STRING
      },
      dateMovie: {
        type: Sequelize.DATE
      },
      seatNumber: {
        type: Sequelize.STRING
      },
      showTime: {
        type: Sequelize.DATE
      },
      price: {
        type: Sequelize.INTEGER
      },
      MovieId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Movies"
        }
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Tickets');
  }
};