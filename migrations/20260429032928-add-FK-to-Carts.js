"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Carts", "userId", {
      type: Sequelize.INTEGER,
      references: { model: "Users", key: "id" },
      onUpdate: "cascade",
      onDelete: "cascade",
    });

    await queryInterface.addColumn("Carts", "productId", {
      type: Sequelize.INTEGER,
      references: { model: "Products", key: "id" },
      onUpdate: "cascade",
      onDelete: "cascade",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Carts", "userId");

    await queryInterface.removeColumn("Carts", "productId");
  },
};
