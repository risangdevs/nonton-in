'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => {
    let data = require("../data/user.json")
    data.forEach(el => {
      el.password = bcrypt.hashSync(el.password, bcrypt.genSaltSync(5))
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })
    return queryInterface.bulkInsert("Users", data, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
