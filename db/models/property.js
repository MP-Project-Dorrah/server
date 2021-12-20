const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  name: { type: String, required: true},
  price: { type: Number, required: true },
  city: { type: String, required: true },
  location : {type: String, required: true},
  describe: { type: String, required: true },
  isDeleted: { type: Boolean , default: false},
  date : {type: date , default: new Date()},
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  propertyHighlights: {type: Object, required: true},
});

module.exports = mongoose.model("Property", propertySchema);
