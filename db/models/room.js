const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  user1: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
  user2: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  onPost: { type: mongoose.Schema.Types.ObjectId, ref: "Msg" },
});

module.exports = mongoose.model("Room", roomSchema);
