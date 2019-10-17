const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const user = require("./userModel");
const generateToken = require("./generateToken");
const restricted = require("./restricted-middleware");

router.post("/register", (req, res) => {
  let { username, password, department } = req.body;

  console.log(req.body);
  let credentials = { username, password, department };
  const hash = bcrypt.hashSync(credentials.password, 8);
  credentials.password = hash;
  user
    .add(credentials)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      res.status(500).json({ errorMessage: "Error registering user" });
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;
  console.log(req.body);
  user
    .findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        // req.session.token = token;
        res.status(200).json({
          message: `Welcome ${username}`,
          token,
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(401).json(error);
    });
});

router.get("/users", restricted, (req, res) => {
  user
    .find()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// router.post("/logout", (req, res) => {
//   if (req.session) {
//     req.session.destroy(err => {
//       res
//         .status(200)
//         .json({ message: "You can take a break, but you can't leave" });
//     });
//   } else {
//     res.send("Bye");
//   }
// });

module.exports = router;
