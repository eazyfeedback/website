const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const cors = require("cors");
const secrets = require("../secrets");

module.exports = [
  cors(),
  bodyParser.json(),
  bodyParser.urlencoded({ extended: true }),
  (req, res, next) => {
    req.firebaseServer = firebase;
    next();
  },
  cookieSession({
    keys: secrets.firebase.secret,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }),
  require("./logger")
];
