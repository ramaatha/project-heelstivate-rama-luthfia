const { User } = require("../models");
const bcrypt = require("bcryptjs");

class AuthController {
  static getLogin(req, res) {
    res.render("auth/login", { error: null });
  }

  static async postLogin(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.render("auth/login", { error: "Email dan password harus diisi" });
      }

      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.render("auth/login", { error: "Email tidak ditemukan atau belum terdaftar" });
      }

      const isMatch = bcrypt.compareSync(password, user.password);
      if (!isMatch) {
        return res.render("auth/login", { error: "Password salah" });
      }

      req.session.userId = user.id;
      req.session.username = user.username;
      req.session.role = user.role;

      res.redirect("/products");
    } catch (error) {
      res.render("auth/login", { error: error.message });
    }
  }

  static getRegister(req, res) {
    res.render("auth/register", { errors: [] });
  }

  static async postRegister(req, res) {
    try {
      const { username, email, password, role } = req.body;

      await User.create({ username, email, password, role });

      res.redirect("/login");
    } catch (error) {
      const errors = error.errors ? error.errors.map((e) => e.message) : [error.message];
      res.render("auth/register", { errors });
    }
  }

  static logout(req, res) {
    req.session.destroy(function (err) {
      res.redirect("/login");
    });
  }
}

module.exports = AuthController;