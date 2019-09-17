module.exports = (req, res, next) => {
  // is the user logged in === do we have information about the user in our session

  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({ message: "You shall not pass!" });
  }
};

// For Day 1 of Assignment
// const bcrypt = require("bcryptjs");
// const Users = require("../users/users-model.js");

// module.exports = {
//   auth
// };

// function auth(req, res, next) {
//   let { username, password } = req.headers;

//   Users.findBy({ username })
//     .first()
//     .then(user => {
//       if (user && bcrypt.compareSync(password, user.password)) {
//         next();
//       } else {
//         res.status(401).json({ message: "You shall not pass!" });
//       }
//     })
//     .catch(error => {
//       res.status(500).json(error);
//     });
// }
