const express = require("express");
const propertyRouter = express.Router();

const { getAllProperty , createProperty } = require("../controllers/property");

propertyRouter.get("/", getAllProperty );

propertyRouter.post("/create", createProperty );

module.exports = propertyRouter;
