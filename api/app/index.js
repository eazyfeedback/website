const express = require("express");
const mongoose = require("mongoose");
const admin = require("firebase-admin");
require("./db");
const middleware = require("../middleware");
const secrets = require("../../secrets");
const checkCreateUser = require("./checkCreate");

const app = express();

const {
  mongodb: { url: mongodbURL }
} = secrets;
mongoose.connect(mongodbURL, { useNewUrlParser: true });

app.use(...middleware);
app.use("/api/essays", require("../routes/essays"));
app.use("/api/users", require("../routes/users"));

const firebase = admin.initializeApp(
  {
    credential: admin.credential.cert(secrets.firebase.server)
  },
  "server"
);

app.post("/auth/login", (req, res) => {
  firebase
    .auth()
    .verifyIdToken(req.body.token)
    .then(async decodedToken => {
      req.session = decodedToken;
      await checkCreateUser(decodedToken.uid);
      res.json({ user: decodedToken });
    });
});

app.post("/auth/logout", (req, res) => {
  req.session = null;
  res.json({ status: true });
});

process.env.NODE_ENV === "production" ? app.listen() : app.listen(3001);
