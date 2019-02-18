const User = require("../models/user");

function checkCreateUser(uid) {
  return User.findOne({ uid }).then((err, user) => {
    if (!user) {
      const newUser = new User({ uid });
      timeStamp("post", newUser);
      return newUser.save();
    } else {
      return Promise.resolve(true);
    }
  });
}

function timeStamp(method, entity) {
  if (method === "post") entity.dateCreated = entity.dateCreated = new Date().toISOString();
  if (method === "patch") req.entity.lastModified = new Date().toISOString();
}

module.exports = {
  timeStamp,
  checkCreateUser
};
