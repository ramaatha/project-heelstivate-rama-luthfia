const { Profile, User } = require("../models");
const { formatDate, timeAgo } = require("../helpers/helper");

class ProfileController {
  static async getProfile(req, res) {
    try {
      const { userId } = req.session;

      const user = await User.findByPk(userId, {
        include: [{ model: Profile }],
      });

      res.render("profile/index", { user, formatDate, timeAgo });
    } catch (error) {
      res.send(error.message);
    }
  }

  static async postUpdateProfile(req, res) {
    try {
      const { userId } = req.session;
      const profile = await Profile.findOne({ where: { userId } });

      const { address, phoneNumber, avatarUrl } = req.body;

      if (profile) {
        await profile.update({ address, phoneNumber, avatarUrl });
      } else {
        await Profile.create({ address, phoneNumber, avatarUrl, userId });
      }

      res.redirect("/profile");
    } catch (error) {
      res.send(error.message);
    }
  }
}

module.exports = ProfileController;
