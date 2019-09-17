const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);

const UsersRouter = require("./users/users-router.js");
const AuthRouter = require("./auth/auth-router.js");

const dbConnection = require("../data/db-config.js");
const restricted = require("./auth/auth-middleware.js");

const server = express();

const sessionConfig = {
  name: "oreo", // would name the cookie sid by default
  secret: process.env.SESSION_SECRET || "it's a secret",
  cookie: {
    maxAge: 1000 * 60 * 60, // in milliseconds
    secure: false, // true means only send cookie over https - want it true in production
    httpOnly: true // true means JS has no access to the cookie
  },
  resave: false, // if there are no changes do you want me to save your cookie again?
  saveUninitialized: true, // GDPR compliance
  store: new KnexSessionStore({
    knex: dbConnection, //instance of a knex that already talks to db
    tablename: "knexsessions", //tablename/sidfieldname is optional, will be provided if not filled
    sidfieldname: "sessionid",
    createtable: true,
    clearInterval: 1000 * 60 * 30 //clean out expired session data
  })
};

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(session(sessionConfig));

server.use("/api/restricted", restricted);
server.use("/api/restricted/users", UsersRouter);
server.use("/api/auth", AuthRouter);

// server check
server.get("/", (req, res) => {
  res.send("<h3>API is connected and server is running</h3>");
});

server.get("/api/restricted/test", (req, res) => {
  res.send("<h3>Congrats you're logged in!");
});

module.exports = server;
