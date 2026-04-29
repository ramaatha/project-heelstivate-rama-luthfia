"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [
      {
        username: "SellerHeel",
        email: "seller@heelstivate.com",
        password: bcrypt.hashSync("seller123", 10),
        role: "seller",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "BuyerShoe",
        email: "buyer@heelstivate.com",
        password: bcrypt.hashSync("buyer123", 10),
        role: "buyer",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
