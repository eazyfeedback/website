const express = require("express");
const next = require("next");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_DEV !== "production";
const conf = require("../next.config");
const nextApp = next({ dev, conf });
const handle = nextApp.getRequestHandler();
const mongoose = require("mongoose");
const {
  mongodb: { username, password }
} = require("../secrets.json");

mongoose.connect(
  `mongodb://${username}:${encodeURIComponent(password)}@ds161804.mlab.com:61804/essayfeedback`,
  { useNewUrlParser: true }
);

nextApp.prepare().then(() => {
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use("/api", require("./routes"));
  app.get("*", (req, res) => handle(req, res));
  app.listen(PORT, err => {
    if (err) throw err;
    console.log(`server ready at http://localhost:${PORT}`);
  });
});
