const express = require("express");
const mongoose = require("mongoose");
const admin = require("firebase-admin");
require("./db");
const middleware = require("../middleware");
const secrets = require("../../secrets");
const { checkCreateUser } = require("../utils");

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

app.use((req, res, next) => {
  req.firebaseServer = firebase;
  next();
});

const selector = ({ email, uid, email_verified, name, picture }) => ({
  uid,
  name,
  email,
  email_verified,
  picture
});

app.post("/auth/login", (req, res) => {
  firebase
    .auth()
    .verifyIdToken(req.body.token)
    .then(decodedToken => selector(decodedToken))
    .then(async user => {
      await checkCreateUser(user.uid);
      req.session = user;
      res.json({ user: user });
    });
});

app.post("/auth/logout", (req, res) => {
  req.session = null;
  res.json({ status: true });
});

process.env.NODE_ENV === "production" ? app.listen() : app.listen(3001);
