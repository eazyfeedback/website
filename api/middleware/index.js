const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const cors = require("cors");
const { checkAPIAuth } = require("./auth");

module.exports = [
  cors(),
  bodyParser.json(),
  bodyParser.urlencoded({ extended: true }),
  cookieSession({
    secret: require("../../secrets").session.secret,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }),
  require("./logger")
];
