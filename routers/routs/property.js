const express = require("express");
const propertyRouter = express.Router();
const authentication = require("./../middleWhere/authentication");

const {
  getAllProperty,
  deleteProperty,
  createProperty,
  oneProperty,
  getUserProperty,
  searchProperty,
  mapSortProperty,
} = require("../controllers/property");

propertyRouter.get("/", getAllProperty);
propertyRouter.put("/delete", authentication ,  deleteProperty);
propertyRouter.post("/create",authentication ,  createProperty);
propertyRouter.get("/oneProperty/:_id", oneProperty);
propertyRouter.get("/userProperty/:postedBy", getUserProperty);
propertyRouter.post("/searchProperty", searchProperty);
propertyRouter.post("/mapSort", mapSortProperty);

module.exports = propertyRouter;
