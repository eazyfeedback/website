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
