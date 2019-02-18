function checkSession(req, res, next) {
  if (req.session) next();
  else res.status(403).end("Not in session");
}

function checkAPIAuth(req, res, next) {}

module.exports = {
  checkSession,
  checkAPIAuth
};
