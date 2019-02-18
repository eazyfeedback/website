function checkCreateUser(uid) {
  return require("../models/user")
    .find({ uid })
    .catch(() => User.create({ uid }))
    .then(() => true);
}

function timeStamp(method, entity) {
  if (method === "post") entity.dateCreated = essay.dateCreated = new Date().toISOString();
  if (method === "patch") req.essay.lastModified = new Date().toISOString();
}

module.exports = {
  timeStamp,
  checkCreateUser
};
