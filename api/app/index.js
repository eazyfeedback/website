const express = require("express");
const mongoose = require("mongoose");
require("./db");
const middleware = require("../middleware");
const secrets = require("../secrets");

const app = express();

const {
  mongodb: { username, password }
} = secrets;

mongoose.connect(`mongodb://${username}:${encodeURIComponent(password)}@ds161804.mlab.com:61804/essayfeedback`, { useNewUrlParser: true });

app.use(...middleware);
app.use("/api/essays", require("../routes/essays"));
app.use("/api/users", require("../routes/users"));

process.env.NODE_ENV === "production" ? app.listen() : app.listen(3001);
