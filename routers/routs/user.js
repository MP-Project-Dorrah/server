const express = require("express");
const userRouter = express.Router();

const { signUp, confirmEmail } = require("./../controllers/user");

userRouter.post("/create", signUp);
userRouter.get("/confirmation/:email/:token", confirmEmail);

module.exports = userRouter;
