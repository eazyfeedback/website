const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const fileStore = require("session-file-store")(session);
const next = require("next");
const admin = require("firebase-admin");
const secrets = require("./secrets");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const firebase = admin.initializeApp(
  {
    credential: admin.credential.cert(secrets.firebase.server)
  },
  "server"
);

app.prepare().then(() => {
  const server = express();
  server.use(bodyParser.json());
  const secret = secrets.firebase.secret;
  server.use(
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

  server.use((req, res, next) => {
    req.firebaseServer = firebase;
    next();
  });

  server.post("/auth/login", (req, res) => {
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

  server.post("/auth/logout", (req, res) => {
    req.session.decodedToken = null;
    res.json({ status: true });
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Server on http://localhost:${port}`);
  });
});
