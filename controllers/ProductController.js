const { Product, Category } = require("../models");
const { formatRupiah, formatDate, timeAgo } = require("../helpers/helper");
const QRCode = require("qrcode");

class ProductController {
  static async getProducts(req, res) {
    try {
      var search = req.query.search || "";
      var sort = req.query.sort || "";
      var categoryId = req.query.categoryId || "";

      var products = await Product.getAll({ search, sort, categoryId });
      var categories = await Category.findAll();

      res.render("products/index", {
        products,
        categories,
        search,
        sort,
        categoryId,
        formatRupiah,
      });
    } catch (error) {
      res.send(error.message);
    }
  }

  static async getProductDetail(req, res) {
    try {
      var id = req.params.id;
      var product = await Product.getById(id);

      if (!product) {
        return res.send("Produk tidak ditemukan");
      }

      var productUrl = "http://localhost:3000/products/" + id;
      var qrCode = await QRCode.toDataURL(productUrl, {
        width: 180,
        margin: 2,
        color: { dark: "#3E2723", light: "#FDF6EC" },
      });

      res.render("products/detail", {
        product,
        formatRupiah,
        formatDate,
        timeAgo,
        qrCode,
      });
    } catch (error) {
      res.send(error.message);
    }
  }

  static async getAddProduct(req, res) {
    try {
      var categories = await Category.findAll();
      res.render("products/add", { categories, error: null });
    } catch (error) {
      res.send(error.message);
    }
  }

  static async postAddProduct(req, res) {
    try {
      await Product.create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        size: req.body.size,
        stock: req.body.stock,
        sold: 0,
        imgUrl: req.body.imgUrl,
        categoryId: req.body.categoryId,
        userId: req.session.userId,
      });

      res.redirect("/products");
    } catch (error) {
      var categories = await Category.findAll();
      var errorMsg = error.errors ? error.errors[0].message : error.message;
      res.render("products/add", { categories, error: errorMsg });
    }
  }

  static async getEditProduct(req, res) {
    try {
      var id = req.params.id;
      var product = await Product.getById(id);

      if (!product) {
        return res.send("Produk tidak ditemukan");
      }

      var categories = await Category.findAll();
      res.render("products/edit", { product, categories, error: null });
    } catch (error) {
      res.send(error.message);
    }
  }

  static async postEditProduct(req, res) {
    try {
      var id = req.params.id;
      var product = await Product.findByPk(id);

      if (!product) {
        return res.send("Produk tidak ditemukan");
      }

      await product.update({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        size: req.body.size,
        stock: req.body.stock,
        imgUrl: req.body.imgUrl,
        categoryId: req.body.categoryId,
      });

      res.redirect("/products");
    } catch (error) {
      var errorMsg = error.errors ? error.errors[0].message : error.message;
      var product = await Product.findByPk(req.params.id);
      var categories = await Category.findAll();
      res.render("products/edit", { product, categories, error: errorMsg });
    }
  }

  static async postDeleteProduct(req, res) {
    try {
      var id = req.params.id;
      var product = await Product.findByPk(id);

      if (!product) {
        return res.send("Produk tidak ditemukan");
      }

      await product.destroy();
      res.redirect("/products");
    } catch (error) {
      res.send(error.message);
    }
  }
}

module.exports = ProductController;
