const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const fileStore = require("session-file-store")(session);
const admin = require("firebase-admin");
const secrets = require("./secrets");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(require("./logger"));
app.use("/api/essays", require("./routes/essays"));
app.use("/api/users", require("./routes/users"));

const secret = secrets.firebase.secret;

const firebase = admin.initializeApp(
  {
    credential: admin.credential.cert(secrets.firebase)
  },
  "server"
);

app.use(
  session({
    secret,
    saveUninitialized: true,
    store: new fileStore({ path: "/tmp/sessions", secret }),
    resave: false,
    rolling: true,
    httpOnly: true,
    cookie: { maxAge: 604800000 } // week
  })
);

app.use((req, res, next) => {
  req.firebaseServer = firebase;
  next();
});

const {
  mongodb: { username, password }
} = secrets;
mongoose.connect(`mongodb://${username}:${encodeURIComponent(password)}@ds161804.mlab.com:61804/essayfeedback`, { useNewUrlParser: true });

app.post("/auth/login", (req, res) => {
  if (!req.body) return res.sendStatus(400);
  const token = req.body.token || "";
  firebase
    .auth()
    .verifyIdToken(token)
    .then(decodedToken => {
      req.session.decodedToken = decodedToken;
      return decodedToken;
    })
    .then(decodedToken => res.json({ status: true, decodedToken }))
    .catch(error => res.json({ error }));
});

app.post("/auth/logout", (req, res) => {
  req.session.decodedToken = null;
  res.json({ status: true });
});

app.listen(PORT, err => {
  if (err) throw err;
  console.info(`server ready at http://localhost:${PORT}`);
});
