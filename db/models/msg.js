const mongoose = require("mongoose");

const msgSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  room: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
  msgContent: { type: String },
});

module.exports = mongoose.model("Msg", msgSchema);
