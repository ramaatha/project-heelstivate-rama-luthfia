const { Product, Category } = require("../models");
const { formatRupiah, formatDate, timeAgo } = require("../helpers/helper");
const QRCode = require("qrcode");

class ProductController {
  static async getProducts(req, res) {
    try {
      const search = req.query.search || "";
      const sort = req.query.sort || "";
      const categoryId = req.query.categoryId || "";

      const products = await Product.getAll({ search, sort, categoryId });
      const categories = await Category.findAll();

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
      const id = req.params.id;
      const product = await Product.getById(id);

      if (!product) {
        return res.send("Produk tidak ditemukan");
      }

      const productUrl = `http://localhost:3000/products/${id}`;
      const qrCode = await QRCode.toDataURL(productUrl, {
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
      const categories = await Category.findAll();
      res.render("products/add", { categories, errors: [] });
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
      const categories = await Category.findAll();
      const errors = error.errors ? error.errors.map((e) => e.message) : [error.message];
      res.render("products/add", { categories, errors });
    }
  }

  static async getEditProduct(req, res) {
    try {
      const id = req.params.id;
      const product = await Product.getById(id);

      if (!product) {
        return res.send("Produk tidak ditemukan");
      }

      const categories = await Category.findAll();
      res.render("products/edit", { product, categories, error: null });
    } catch (error) {
      res.send(error.message);
    }
  }

  static async postEditProduct(req, res) {
    try {
      const id = req.params.id;
      const product = await Product.findByPk(id);

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
      const errorMsg = error.errors ? error.errors[0].message : error.message;
      const product = await Product.findByPk(req.params.id);
      const categories = await Category.findAll();
      res.render("products/edit", { product, categories, error: errorMsg });
    }
  }

  static postDeleteProduct(req, res) {
    const id = req.params.id;

    Product.findByPk(id)
      .then((product) => {
        if (!product) throw new Error("Produk tidak ditemukan");
        return product.destroy();
      })
      .then(() => {
        res.redirect("/products");
      })
      .catch((error) => {
        res.send(error.message);
      });
  }
}

module.exports = ProductController;
