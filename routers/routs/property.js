const express = require("express");
const propertyRouter = express.Router();

const {
  getAllProperty,
  deleteProperty,
  createProperty,
  oneProperty,
} = require("../controllers/property");

propertyRouter.get("/", getAllProperty);
propertyRouter.put("/delete", deleteProperty);
propertyRouter.post("/create", createProperty);
propertyRouter.get("/oneProperty/:_id", oneProperty);

module.exports = propertyRouter;
