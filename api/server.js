const express = require("express");

const UsersRouter = require("../api/users/users-router.js");

const server = express();

server.use(express.json());

server.use("/api/users", UsersRouter);

server.get("/", (req, res) => {
  res.send("<h3>API is connected and server is running</h3>");
});

module.exports = server;
