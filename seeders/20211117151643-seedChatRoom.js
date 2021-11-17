'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("ChatRooms", [
      {
        MovieId: 10,
        UserId: 1,
        message: "Film nya keren",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ChatRooms', null, {});
  }
};
