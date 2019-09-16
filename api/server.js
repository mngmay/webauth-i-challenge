const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const UsersRouter = require("./users/users-router.js");
const AuthRouter = require("./auth/auth-router.js");

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use("/api/users", UsersRouter);
server.use("/api/auth", AuthRouter);

// server check
server.get("/", (req, res) => {
  res.send("<h3>API is connected and server is running</h3>");
});

module.exports = server;
