const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  city: { type: String, required: true },
  phonNumber: { type: Number, required: true },
  password: { type: String },
  nationalId: { type: Number, required: true },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role", required: true },
  img: {
    type: String,
    default:
      "https://i.pinimg.com/564x/e7/c3/f4/e7c3f4a076b8472e0b1bd9c00a847f7f.jpg",
  },
  isVerified: { type: Boolean, default: false },
  resetLink: { data: String, default: "" },
  subscribeStatus: { type: String, defult: "unActive" }, //active - cancelPending  - unActive
  sellerRateArr: { type: Array, default: [] },
  realestateAgentRateArr: { type: Array, default: [] },
  Availability: { type: Boolean, default: true },
  realestateAgentCommission: { type: Number },
  isDeleted: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", userSchema);
