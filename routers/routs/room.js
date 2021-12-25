const express = require("express");
const roomRouter = express.Router();

const { getOrCreateRoom } = require("./../controllers/room");

roomRouter.post("/create", getOrCreateRoom);

module.exports = roomRouter;
