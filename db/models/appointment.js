const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  client: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
  onProperty: { type: mongoose.Schema.Types.ObjectId, ref: "Property", required: true},
  realestateAgent : {type: mongoose.Schema.Types.ObjectId, ref: "User"}, 
  date : {type: date , default: new Date()} , 
  status: {type: mongoose.Schema.Types.ObjectId, ref: "Status" }, 
});

module.exports = mongoose.model("Appointment", appointmentSchema);
