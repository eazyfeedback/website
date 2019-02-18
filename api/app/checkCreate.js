const User = require("../models/user");

function checkCreateUser(uid) {
  User.find({ uid }).catch(() => User.create({ uid }));
}

module.exports = checkCreateUser;
