const { Product, Category } = require("../models");
const { formatRupiah } = require("../helpers/helper");

class DashboardController {
  static async getDashboard(req, res) {
    try {
      var userId = req.session.userId;

      var myProducts = await Product.findAll({
        where: { userId: userId },
        include: [{ model: Category, as: "Category" }],
        order: [["sold", "DESC"]],
      });

      var categories = await Category.findAll();

      var categoryCount = {};
      categories.forEach(function (cat) {
        categoryCount[cat.name] = 0;
      });

      myProducts.forEach(function (product) {
        if (product.Category) {
          categoryCount[product.Category.name] =
            (categoryCount[product.Category.name] || 0) + 1;
        }
      });

      var topProducts = myProducts.slice(0, 6);

      var totalRevenue = myProducts.reduce(function (acc, p) {
        return acc + p.price * p.sold;
      }, 0);

      var totalStock = myProducts.reduce(function (acc, p) {
        return acc + p.stock;
      }, 0);

      res.render("dashboard/index", {
        myProducts,
        categoryCount,
        topProducts,
        totalRevenue,
        totalStock,
        formatRupiah,
      });
    } catch (error) {
      res.send(error.message);
    }
  }
}

module.exports = DashboardController;
