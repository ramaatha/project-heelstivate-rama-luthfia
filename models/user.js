"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Profile, { foreignKey: "userId" });
      User.hasMany(models.Product, { foreignKey: "userId" });
      User.belongsToMany(models.Product, {
        through: models.Cart,
        foreignKey: "userId",
      });
    }
  }

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Username wajib diisi" },
          notEmpty: { msg: "Username tidak boleh kosong" },
          len: {
            args: [3, 30],
            msg: "Username harus antara 3-30 karakter",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: "Email wajib diisi" },
          notEmpty: { msg: "Email tidak boleh kosong" },
          isEmail: { msg: "Format email tidak valid" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Password wajib diisi" },
          notEmpty: { msg: "Password tidak boleh kosong" },
          len: {
            args: [8],
            msg: "Password minimal 8 karakter",
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Role wajib dipilih" },
          isIn: {
            args: [["buyer", "seller"]],
            msg: "Role hanya boleh buyer atau seller",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: function (user) {
          var salt = bcrypt.genSaltSync(10);
          user.password = bcrypt.hashSync(user.password, salt);
        },
      },
    }
  );

  return User;
};
