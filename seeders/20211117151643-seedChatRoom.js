'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("ChatRooms", [
      {
        MovieId: 10,
        UserId: 1,
        message: "Best Movie",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        MovieId: 10,
        UserId: 2,
        message: "Nice !!!",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ChatRooms', null, {});
  }
};
