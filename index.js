const express = require("express");
require("dotenv").config();
const cors = require("cors");

const app = express();

require("./db");

app.use(express.json());
app.use(cors());

const roleRouter = require("./routers/routs/role");
app.use("/role", roleRouter);

const userRouter = require("./routers/routs/user");
app.use("/user", userRouter);

const propertyRouter = require("./routers/routs/property");
app.use("/property", propertyRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
