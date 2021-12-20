const express = require("express");
const userRouter = express.Router();

const {
  signUp,
  confirmEmail,
  ForgetPassword,
  resetPassword,
} = require("./../controllers/user");

userRouter.post("/create", signUp);
userRouter.get("/confirmation/:email/:token", confirmEmail);
userRouter.put("/forgetPassword", ForgetPassword);
userRouter.put("/resetPassword", resetPassword);

module.exports = userRouter;
