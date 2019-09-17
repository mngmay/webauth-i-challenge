const express = require("express");
const bcrypt = require("bcryptjs");
const Users = require("../users/users-model.js");
const restricted = require("./auth-middleware.js");
const router = express.Router();

router.post("/register", (req, res) => {
  let { username, password } = req.body;
  const hash = bcrypt.hashSync(password, 10);

  Users.add({ username, password: hash })
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = user;
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: "You cannot pass!" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy(error => {
      if (error) {
        res.status(500).json({ message: "could not logout" });
      } else {
        res.status(200).json({ message: "bye" });
      }
    }); // destroy accepts a cb if you want, but not necessary
  } else {
    res.status(200).json({ message: "already logged out" }); // or res.end()
  }
});

module.exports = router;
