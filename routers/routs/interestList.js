const express = require("express");
const { likeProperty, checkLike } = require("./../controllers/interestList");

const interestListRouter = express.Router();

interestListRouter.post("/", likeProperty);
interestListRouter.get("/:onPost", checkLike);

module.exports = interestListRouter;
