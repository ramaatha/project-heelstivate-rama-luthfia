"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      Cart.belongsTo(models.User, { foreignKey: "userId" });
      Cart.belongsTo(models.Product, { foreignKey: "productId" });
    }
  }

  Cart.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Quantity wajib diisi" },
          quantityMinimal: function (value) {
            if (value < 1) {
              throw new Error("Quantity produk yang akan dibeli minimal berjumlah 1");
            }
          },
        },
      },
      userId: {
        type: DataTypes.INTEGER,
      },
      productId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Cart",
    }
  );

  return Cart;
};
