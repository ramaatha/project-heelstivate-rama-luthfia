const { Cart, Product, Category } = require("../models");
const { formatRupiah } = require("../helpers/helper");

class CartController {
  static async getCart(req, res) {
    try {
      const userId = req.session.userId;

      const carts = await Cart.findAll({
        where: { userId },
        include: [
          {
            model: Product,
            include: [{ model: Category, as: "Category" }],
          },
        ],
      });

      res.render("cart/index", { carts, formatRupiah });
    } catch (error) {
      res.send(error.message);
    }
  }

  static async postAddToCart(req, res) {
    try {
      const userId = req.session.userId;
      const productId = req.params.productId;
      const quantity = Number(req.body.quantity) || 1;

      const product = await Product.findByPk(productId);
      if (!product) {
        return res.send("Produk tidak ditemukan");
      }

      if (product.stock < quantity) {
        return res.send("Stok tidak mencukupi");
      }

      const existingCart = await Cart.findOne({
        where: { userId, productId },
      });

      if (existingCart) {
        const newQty = existingCart.quantity + quantity;
        await existingCart.update({ quantity: newQty });
      } else {
        await Cart.create({ userId, productId, quantity });
      }

      await product.update({
        sold: product.sold + quantity,
        stock: product.stock - quantity,
      });

      res.redirect("/cart");
    } catch (error) {
      res.send(error.message);
    }
  }

  static async postDeleteCart(req, res) {
    try {
      const id = req.params.id;
      const cart = await Cart.findByPk(id);
      if (!cart) throw new Error("Item tidak ditemukan");
      await cart.destroy();
      res.redirect("/cart");
    } catch (error) {
      res.send(error.message);
    }
  }
}

module.exports = CartController;