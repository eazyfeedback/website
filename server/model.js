const mongoose = require("mongoose");
const schema = mongoose.Schema;

const essayModel = new schema({
  areas: { type: Array, default: [] },
  stages: { type: Array, default: [] },
  comment: { type: String },
  link: { type: String }
});

module.exports = mongoose.model("essays", essayModel);
