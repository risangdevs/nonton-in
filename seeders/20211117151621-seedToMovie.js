module.exports = {
  up: (queryInterface, Sequelize) => {
    let data = require("../data/movies.json")
    data.forEach(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })
    return queryInterface.bulkInsert("Movies", data, {})
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Movies", null, {})
  }
};
