"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert("Customers", [
      {
        firstName: "Cepot",
        lastName: "Red",
        birthOfDate: new Date(12-9-1991),
        profile_picture:
          "https://mir-s3-cdn-cf.behance.net/project_modules/disp/06099917693951.562bd7a5744b1.jpg",
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Dawala",
        lastName: "White",
        birthOfDate: new Date(12-9-1992),
        profile_picture:
          "http://img.uncyc.org/id/a/a2/Dawala.jpg",
        UserId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.BulkDelete("Customers");
  },
};
