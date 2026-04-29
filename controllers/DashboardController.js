const { Product, Category } = require("../models");
const { formatRupiah } = require("../helpers/helper");

class DashboardController {
  static async getDashboard(req, res) {
    try {
      const userId = req.session.userId;

      const myProducts = await Product.findAll({
        where: { userId },
        include: [{ model: Category, as: "Category" }],
        order: [["sold", "DESC"]],
      });

      const categories = await Category.findAll();

      const categoryCount = {};
      categories.forEach((cat) => {
        categoryCount[cat.name] = 0;
      });

      myProducts.forEach((product) => {
        if (product.Category) {
          categoryCount[product.Category.name] =
            (categoryCount[product.Category.name] || 0) + 1;
        }
      });

      const topProducts = myProducts.slice(0, 6);

      const totalRevenue = myProducts.reduce((acc, p) => acc + p.price * p.sold, 0);
      const totalStock = myProducts.reduce((acc, p) => acc + p.stock, 0);

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
