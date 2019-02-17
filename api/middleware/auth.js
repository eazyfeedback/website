const admin = require("firebase-admin");

const firebase = admin.initializeApp(
  {
    credential: admin.credential.cert(secrets.firebase)
  },
  "server"
);

function auth(req, res, next) {
  firebase
    .auth()
    .verifyIdToken(req.body.token)
    .then(decodedToken => {
      req.session = decodedToken;
      next();
    })
    .catch(next);
}

module.exports = auth;
