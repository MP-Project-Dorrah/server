const express = require("express");
const userRouter = express.Router();

const { signUp } = require("./../controllers/user");

userRouter.post("/create", signUp);

module.exports = userRouter;
