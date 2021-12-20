const express = require("express");
const userRouter = express.Router();

const {
  signUp,
  confirmEmail,
  ForgetPassword,
  resetPassword,
  logIn,
  deleteUser
} = require("./../controllers/user");

userRouter.post("/create", signUp);
userRouter.get("/confirmation/:email/:token", confirmEmail);
userRouter.put("/forgetPassword", ForgetPassword);
userRouter.put("/resetPassword", resetPassword);
userRouter.post("/log", logIn);
userRouter.delete("/delete/:_id", deleteUser);

module.exports = userRouter;
