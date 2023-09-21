const express = require("express");
const cors = require("cors");
require('dotenv').config()
const app = express();
app.use(cors());
app.use(express.json());
const Connection = require("./models/connection");
const globalMiddleware = require("./middleware/authmiddleware");
const PORT = process.env.PORT || 4000;
Connection.connectDB();

const userRouter = require("./route/user");
const authRouter = require("./route/auth");
const site = require("./route/site");
const mission = require("./route/mission");

app.use(globalMiddleware.rateLimitMiddleware());
app.use("/v1/auth", authRouter);
app.use(globalMiddleware.globalMiddleware);
app.use("/v1/user", userRouter);
app.use("/v1", site);
app.use("/v1", mission);

app.listen(PORT, (error) => {
  if (!error) console.log("Server is Successfully Running on port " + PORT);
  else console.log("Error occurred, server can't start", error);
});
