const express = require("express");
const authentication = require("./../middleWhere/authentication");

const { likeProperty, checkLike , userLikes} = require("./../controllers/interestList");

const interestListRouter = express.Router();

interestListRouter.post("/likeToggle",authentication, likeProperty);
interestListRouter.get("/check/:onProperty",authentication ,  checkLike);
interestListRouter.get("/userLikes/:by", userLikes);

module.exports = interestListRouter;
