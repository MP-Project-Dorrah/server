const express = require("express");
const roleRouter = express.Router();
const authentication = require("./../middleWhere/authentication");
const authorization = require("./../middleWhere/authorization");

const { createRole, getAllRoles } = require("./../controllers/role");

roleRouter.post("/create", createRole);
roleRouter.get("/", authentication, authorization, getAllRoles);

module.exports = roleRouter;
