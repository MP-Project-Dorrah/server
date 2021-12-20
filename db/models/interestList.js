const mongoose = require("mongoose");

const interestListSchema = new mongoose.Schema({
  by: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
  onProperty: { type: mongoose.Schema.Types.ObjectId, ref: "Property", required: true},
});


module.exports = mongoose.model("InterestList", interestListSchema);
