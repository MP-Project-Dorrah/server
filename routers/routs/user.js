const express = require("express");
const userRouter = express.Router();

const {
  signUp,
  confirmEmail,
  ForgetPassword,
  resetPassword,
  logIn,
  deleteUser,
  allRealestateAgents,
  oneUser,
  newRate,
} = require("./../controllers/user");

userRouter.post("/create", signUp);
userRouter.get("/confirmation/:email/:token", confirmEmail);
userRouter.put("/forgetPassword", ForgetPassword);
userRouter.put("/resetPassword", resetPassword);
userRouter.post("/log", logIn);
userRouter.delete("/delete/:_id", deleteUser);
userRouter.get("/allRealestateAgents", allRealestateAgents); 
userRouter.get("/oneUser/:_id", oneUser);
userRouter.post("/newRate", newRate);

module.exports = userRouter;
