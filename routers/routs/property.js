const express = require("express");
const propertyRouter = express.Router();

const { getAllProperty , deleteProperty , createProperty } = require("../controllers/property");

propertyRouter.get("/", getAllProperty );
propertyRouter.put("/delete", deleteProperty );
propertyRouter.post("/create", createProperty );

module.exports = propertyRouter;
