"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static getById(id) {
      return Product.findByPk(id);
    }

    formatPrice() {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(this.price);
    }

    isBestSeller() {
      return this.sold >= 15;
    }

    static associate(models) {
      Product.belongsTo(models.Category, {
        foreignKey: "categoryId",
        as: "Category",
      });
      Product.belongsTo(models.User, {
        foreignKey: "userId",
        as: "User",
      });
      Product.belongsToMany(models.User, {
        through: models.Cart,
        foreignKey: "productId",
      });
      Product.hasMany(models.Cart, { foreignKey: "productId" });
    }
  }

  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Nama produk wajib diisi" },
          notEmpty: { msg: "Nama produk tidak boleh kosong" },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: { msg: "Deskripsi wajib diisi" },
          notEmpty: { msg: "Deskripsi tidak boleh kosong" },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Harga wajib diisi" },
          min: {
            args: [1000],
            msg: "Harga minimal Rp 1.000",
          },
          priceReasonable: function (value) {
            if (value > 50000000) {
              throw new Error("Harga tidak boleh melebihi Rp 50.000.000");
            }
          },
        },
      },
      size: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Ukuran wajib diisi" },
          shoeSizeRange: function (value) {
            if (value < 20 || value > 50) {
              throw new Error("Ukuran sepatu harus antara EU 20 - EU 50");
            }
          },
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Stok wajib diisi" },
          min: {
            args: [0],
            msg: "Stok tidak boleh negatif",
          },
        },
      },
      sold: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      imgUrl: {
        type: DataTypes.STRING,
        validate: {
          isUrl: { msg: "URL gambar tidak valid" },
        },
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Kategori wajib dipilih" },
        },
      },
      userId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Product",
    }
  );

  return Product;
};
