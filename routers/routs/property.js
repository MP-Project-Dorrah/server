const express = require("express");
const propertyRouter = express.Router();

const {
  getAllProperty,
  deleteProperty,
  createProperty,
  oneProperty,
  getUserProperty,
  searchProperty,
} = require("../controllers/property");

propertyRouter.get("/", getAllProperty);
propertyRouter.put("/delete", deleteProperty);
propertyRouter.post("/create", createProperty);
propertyRouter.get("/oneProperty/:_id", oneProperty);
propertyRouter.get("/userProperty/:postedBy", getUserProperty);
propertyRouter.post("/searchProperty", searchProperty);

module.exports = propertyRouter;
