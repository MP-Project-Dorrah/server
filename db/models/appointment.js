const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  client: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
  onProperty: { type: mongoose.Schema.Types.ObjectId, ref: "Property", required: true},
  propertyPostedBy: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
  realestateAgent : {type: mongoose.Schema.Types.ObjectId, ref: "User"}, 
  date : {type: Date , default: new Date()} , 
  isCanceled : {type: Boolean , default: false},
  type : {type: String , required:true}, // video call or in person
  // status: {type: mongoose.Schema.Types.ObjectId, ref: "Status" }, 
});

module.exports = mongoose.model("Appointment", appointmentSchema);
