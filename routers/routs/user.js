const express = require("express");
const userRouter = express.Router();

const {
  signUp,
  confirmEmail,
  ForgetPassword,
  resetPassword,
  logIn
} = require("./../controllers/user");

userRouter.post("/create", signUp);
userRouter.get("/confirmation/:email/:token", confirmEmail);
userRouter.put("/forgetPassword", ForgetPassword);
userRouter.put("/resetPassword", resetPassword);
userRouter.post("/log", logIn);

module.exports = userRouter;
