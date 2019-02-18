const User = require("../models/user");

function checkCreateUser(uid) {
  return User.findOne({ uid }).then((err, user) => {
    if (!user) return User.create({ uid });
    else return Promise.resolve(true);
  });
}

function timeStamp(method, entity) {
  if (method === "post") entity.dateCreated = essay.dateCreated = new Date().toISOString();
  if (method === "patch") req.essay.lastModified = new Date().toISOString();
}

module.exports = {
  timeStamp,
  checkCreateUser
};
