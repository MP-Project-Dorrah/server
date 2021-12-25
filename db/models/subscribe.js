const mongoose = require("mongoose");

const subscribeSchema = new mongoose.Schema({
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  startDate: { type: Date, default: new Date().toJSON().slice(0,10).replace(/-/g,'/') },
  endDate: { type: Date, default: new Date()  }, //+30
  isActive: { type: Boolean, default: true },
});

module.exports = mongoose.model("Subscribe", subscribeSchema);
