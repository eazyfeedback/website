const express = require("express");
const next = require("next");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_DEV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
const mongoose = require("mongoose");
const {
  mongodb: { username, password }
} = require("../secrets.json");

const db = mongoose.connect(
  `mongodb://${username}:${encodeURIComponent(password)}@ds161804.mlab.com:61804/essayfeedback`,
  { useNewUrlParser: true }
);

nextApp.prepare().then(() => {
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use("/api", require("./routes"));
  app.use((req, res, next) => {
    req.db = db;
    next();
  });
  app.get("*", (req, res) => {
    return handle(req, res);
  });
  app.listen(PORT, err => {
    if (err) throw err;
    console.log(`ready at http://localhost:${PORT}`);
  });
});
