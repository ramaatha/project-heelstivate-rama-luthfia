const { Profile, User } = require("../models");
const { formatDate, timeAgo } = require("../helpers/helper");

class ProfileController {
  static async getProfile(req, res) {
    try {
      var userId = req.session.userId;

      var user = await User.findByPk(userId, {
        include: [{ model: Profile }],
      });

      res.render("profile/index", { user, formatDate, timeAgo });
    } catch (error) {
      res.send(error.message);
    }
  }

  static async postUpdateProfile(req, res) {
    try {
      var userId = req.session.userId;
      var profile = await Profile.findOne({ where: { userId: userId } });

      if (profile) {
        await profile.update({
          address: req.body.address,
          phoneNumber: req.body.phoneNumber,
          avatarUrl: req.body.avatarUrl,
        });
      } else {
        await Profile.create({
          address: req.body.address,
          phoneNumber: req.body.phoneNumber,
          avatarUrl: req.body.avatarUrl,
          userId: userId,
        });
      }

      res.redirect("/profile");
    } catch (error) {
      res.send(error.message);
    }
  }
}

module.exports = ProfileController;
