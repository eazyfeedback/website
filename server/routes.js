const express = require("express");
const router = express.Router();
const Essays = require("./model");

router.get("/", (req, res) => {
  Essays.find({}, (err, essays) => {
    res.json(essays);
  });
});

router.post("/", (req, res) => {
  Essays.create({
    ...req.essay
  }).then(err => {
    if (err) res.status(500).send(err);
    else res.json(req.essay);
  });
});

router.use("/:id", (req, res, next) => {
  Essays.findById(req.params.id, (err, essay) => {
    if (err) res.status(500).send(err);
    else req.essay = essay;
    next();
  });
});

router.get("/:id", (req, res) => {
  return res.json(req.essay);
});

router.put("/:id", (req, res) => {
  Object.keys(req.body).map(key => {
    req.essay[key] = req.body[key];
  });
  req.essay.save();
  res.json(req.essay);
});

module.exports = router;
