const express = require("express");
const mongoose = require("mongoose");
const admin = require("firebase-admin");
require("./db");
const secrets = require("../secrets");

const app = express();

const {
  mongodb: { username, password }
} = secrets;

mongoose.connect(`mongodb://${username}:${encodeURIComponent(password)}@ds161804.mlab.com:61804/essayfeedback`, { useNewUrlParser: true });

const firebase = admin.initializeApp(
  {
    credential: admin.credential.cert(secrets.firebase)
  },
  "server"
);

app.use("/api/essays", require("../routes/essays"));
app.use("/api/users", require("../routes/users"));

app.post("/api/auth/login", (req, res) => {
  if (!req.body) return res.sendStatus(400);
  const token = req.body.token;
  firebase
    .auth()
    .verifyIdToken(token)
    .then(decodedToken => {
      req.session.decodedToken = decodedToken;
      return decodedToken;
    })
    .then(decodedToken => res.json({ status: true, decodedToken }));
});

app.post("/api/auth/logout", (req, res) => {
  req.session.decodedToken = null;
  res.json({ status: true });
});

process.env.NODE_ENV === "production" ? app.listen() : app.listen(3001);
