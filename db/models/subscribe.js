const mongoose = require("mongoose");

const subscribeSchema = new mongoose.Schema({
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  startDate: { type: date, default: new Date() },
  endDate: { type: date, default: new Date() + 30 },
  isCanceled: { type: Boolean, default: false },
});

module.exports = mongoose.model("Subscribe", subscribeSchema);
