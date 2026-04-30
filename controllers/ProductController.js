const { Product, Category, User } = require("../models");
const { Op } = require("sequelize");
const { formatRupiah, formatDate, timeAgo } = require("../helpers/helper");
const QRCode = require("qrcode");

class ProductController {
  static async getProducts(req, res) {
    try {
      let { search = "", sort = "", categoryId = "" } = req.query;
      let options = {
        include: [
          { model: Category, as: "Category" },
          { model: User, as: "User" },
        ],
        order: [],
      };

      if (search || categoryId) {
        options.where = {};
        if (search) options.where.name = { [Op.iLike]: `%${search}%` };
        if (categoryId) options.where.categoryId = categoryId;
      }

      if (sort === "price_asc") options.order.push(["price", "ASC"]);
      else if (sort === "price_desc") options.order.push(["price", "DESC"]);
      else if (sort === "terlaris") options.order.push(["sold", "DESC"]);

      let products = await Product.findAll(options);
      let categories = await Category.findAll();

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
      const { id } = req.params;
      const product = await Product.findByPk(id, {
        include: [
          { model: Category, as: "Category" },
          { model: User, as: "User" },
        ],
      });

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
    let { userId } = req.session;
    try {
      const { name, description, price, size, stock, imgUrl, categoryId } = req.body;
      await Product.create({
        name,
        description,
        price: price !== "" ? price : null,
        size: size !== "" ? size : null,
        stock: stock !== "" ? stock : null,
        sold: 0,
        imgUrl,
        categoryId: categoryId !== "" ? categoryId : null,
        userId,
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
      const { id } = req.params;
      const product = await Product.findByPk(id, {
        include: [
          { model: Category, as: "Category" },
          { model: User, as: "User" },
        ],
      });

      if (!product) {
        return res.send("Produk tidak ditemukan");
      }

      const categories = await Category.findAll();
      res.render("products/edit", { product, categories, errors: [] });
    } catch (error) {
      res.send(error.message);
    }
  }

  static async postEditProduct(req, res) {
    let { id } = req.params;
    let { name, description, price, size, stock, imgUrl, categoryId } = req.body;
    try {
      let product = await Product.findByPk(id);

      if (!product) {
        return res.send("Produk tidak ditemukan");
      }

      await product.update({
        name,
        description,
        price: price !== "" ? price : null,
        size: size !== "" ? size : null,
        stock: stock !== "" ? stock : null,
        imgUrl,
        categoryId: categoryId !== "" ? categoryId : null,
      });

      res.redirect("/products");
    } catch (error) {
      let errors = error.errors ? error.errors.map((e) => e.message) : [error.message];
      let product = await Product.findByPk(id);
      let categories = await Category.findAll();
      res.render("products/edit", { product, categories, errors });
    }
  }

  static postDeleteProduct(req, res) {
    let { id } = req.params;

    Product.getById(id)
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
