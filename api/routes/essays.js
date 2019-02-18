const router = require("express").Router();
const Essay = require("../models/essay");
const User = require("../models/user");
const { timeStamp } = require("../utils");

router
  .route("/")
  .get((req, res) => {
    Essay.find({ isReviewComplete: false })
      .limit(12)
      .then(essays => User.sortByPoints(essays).then(essays => res.json({ essays })));
  })
  .post((req, res) => {
    const essay = new Essay(req.body);
    timeStamp(req.method, essay);
    essay.save().then(essay => res.status(201).json({ essay }));
  });

router.use("/:id", (req, res, next) => {
  Essay.findById(req.params.id).then(essay => {
    if (!essay) {
      res.status(500).end("essay not found");
    } else {
      req.essay = essay;
      next();
    }
  });
});

router
  .route("/:id")
  .get((req, res) => {
    res.json({ essay: req.essay });
  })
  .patch((req, res) => {
    for (const prop in req.body) {
      req.essay[prop] = req.body[prop];
    }
    timeStamp(req.method, req.essay);
    req.essay.save().then(() => res.status(200).end());
  })
  .delete((req, res) => {
    req.essay.remove().then(() => res.status(200).end());
  });

module.exports = router;
