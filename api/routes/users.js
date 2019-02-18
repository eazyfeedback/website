const router = require("express").Router();
const User = require("../models/user");
const { checkSession } = require("../middleware/auth");
const { timeStamp } = require("../utils");

router
  .route("/")
  .get((req, res) => {
    const { sort } = req.query;
    let getUsers = User.find({}).limit(12);
    if (sort === "rating" || sort === "points") getUsers = getUsers.sort({ [sort]: -1 });
    getUsers.exec().then(users => res.json({ users }));
  })
  .post((req, res) => {
    const user = new User(req.body);
    timeStamp(req.method, req.user);
    user.save().then(user => res.status(201).json({ user }));
  });

router.use("/:uid*", checkSession, (req, res, next) => {
  User.findOne({ uid: req.params.uid }).then(user => {
    if (!user) {
      res.status(500).end();
    } else {
      req.user = user;
      next();
    }
  });
});

router
  .route("/:uid")
  .get((req, res) => {
    res.json({ user: req.user });
  })
  .patch((req, res) => {
    for (let p in req.body) {
      req.user[p] = req.body[p];
    }
    timeStamp(req.method, req.user);
    req.user.save().then(() => res.status(200).end());
  })
  .delete((req, res) => {
    req.user.remove().then(() => res.status(200).end());
  });

router.get("/:uid/profile", (req, res) => {
  Promise.all([
    req.user.getEssaysReviewed(),
    req.user.getRating(),
    req.user.getEssaysPosted(),
    req.user.getEssaysReviewing(),
    req.user.getPoints()
  ]).then(([essaysReviewed, rating, essaysPosted, essaysReviewing, points]) => {
    res.json({
      profile: {
        essaysPosted,
        rating,
        essaysReviewedCount: essaysReviewed.length,
        essaysReviewing,
        points
      }
    });
  });
});

router.get("/:uid/points", (req, res) => {
  req.user.getPoints().then(points => res.json({ points }));
});

router.post("/uid/rating", (req, res) => {
  const { rating, reviewerUID } = req.body;
  User.findOne({ uid: reviewerUID }).then(reviewer => {
    reviewer.addRating(rating, reviewerUID).then(() => {
      timeStamp(req.method, reviewer);
      res.status(200).end();
    });
  });
});

module.exports = router;
