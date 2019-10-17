const express = require("express");
const server = express();
const helmet = require("helmet");
const cors = require("cors");
const userRouter = require("../users/userRouter");
server.use(express.json());
server.use(helmet());
server.use("/api/users", userRouter);

server.get("/", (req, res) => {
  res.send(`This is working`);
});
module.exports = server;
