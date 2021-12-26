const express = require("express");
const userRouter = express.Router();
const authentication = require("./../middleWhere/authentication");
const authorization = require("./../middleWhere/authorization");

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
  updateUser,
  avabilityToggle,
  availableRealestateAgents,
  allUsers,
  updateUserImg,
} = require("./../controllers/user");

userRouter.post("/create", signUp);
userRouter.get("/confirmation/:email/:token", confirmEmail);
userRouter.put("/forgetPassword", ForgetPassword);
userRouter.put("/resetPassword", resetPassword);
userRouter.put("/updateImg", authentication, updateUserImg);
userRouter.post("/log", logIn);
userRouter.delete("/delete/:_id", deleteUser);
userRouter.get("/allRealestateAgents", allRealestateAgents);
userRouter.get("/allRealestateAgents/:city", availableRealestateAgents);
userRouter.get("/oneUser/:_id", oneUser);
userRouter.post("/newRate", newRate);
userRouter.put("/update", updateUser);
userRouter.post("/available", avabilityToggle);
userRouter.get("/all", authentication, authorization, allUsers);

module.exports = userRouter;
