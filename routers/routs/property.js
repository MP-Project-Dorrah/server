const express = require("express");
const propertyRouter = express.Router();

const { getAllProperty } = require("../controllers/property");

propertyRouter.get("/", getAllProperty);

module.exports = propertyRouter;
