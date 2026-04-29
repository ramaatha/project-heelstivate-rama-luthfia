"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    let categories = require("../data/categories.json")
    categories = categories.map((el) => {
      delete el.id
      el.createdAt = new Date()
      el.updatedAt = new Date()
      return el
    })

    await queryInterface.bulkInsert("Categories", categories)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
