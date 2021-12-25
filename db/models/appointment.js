const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  client: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
  onProperty: { type: mongoose.Schema.Types.ObjectId, ref: "Property", required: true},
  // propertyPostedBy: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
  realestateAgent : {type: mongoose.Schema.Types.ObjectId, ref: "User"}, 
  date : {type: String , required: true} , 
  isCanceled : {type: Boolean , default: false}, //canceled By
  type : {type: String , required:true}, // video call or in person
});

module.exports = mongoose.model("Appointment", appointmentSchema);
