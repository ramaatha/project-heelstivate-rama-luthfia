"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Products", "userId", {
      type: Sequelize.INTEGER,
      references: { model: "Users", key: "id" },
      onUpdate: "cascade",
      onDelete: "cascade",
    });

    await queryInterface.addColumn("Products", "categoryId", {
      type: Sequelize.INTEGER,
      references: { model: "Categories", key: "id" },
      onUpdate: "cascade",
      onDelete: "set null",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Products", "userId");
    await queryInterface.removeColumn("Products", "categoryId");
  },
};
