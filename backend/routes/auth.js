const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { check, validationResult } = require("express-validator");

router.post(
  "/register",
  [
    check("name", "name field is required").isLength({ min: 1 }),
    check("email", "email is required").isEmail(),
    check("password", "password should be at least 6 character ").isLength({ min: 6 }),
  ],
  (req, res) => {
    const { name, email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        error: errors.array()[0].msg,
      });
    }

    User.findOne({ email: email }).then(async (user) => {
      if (user) return res.status(422).json({ success: false, error: "User Already Exists" });

      let hashPassword = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        password: hashPassword,
        name,
      });
      newUser
        .save()
        .then((user) => {
          return res.status(200).json({ success: true, message: "User Saved Succesfully" });
        })
        .catch((err) => {
          return res.status(400).json(err);
        });
    });
  }
);

router.post("/login", [check("email", "email is required").isEmail(), check("password", "password field is required").isLength({ min: 1 })], (req, res) => {
  const { email, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      error: errors.array()[0].msg,
    });
  }

  User.findOne({ email: email }).then((user) => {
    if (!user) {
      return res.status(400).json({ success: false, error: "Invalid Email" });
    }
    bcrypt.compare(password, user.password).then((match) => {
      if (match) {
        const token = jwt.sign({ _id: user._id }, "This is secret that is revealed to all");
        const { _id, name, email } = user;

        res.cookie("token", token, { expire: new Date() + 99999 });

        return res.status(200).json({
          success: true,
          data: {
            token,
            user: user,
          },
        });
      } else {
        return res.status(422).json({ success: false, error: "Password doesn't match " });
      }
    });
  });
});

router.get("/signout", (req, res) => {
  console.l;
  res.clearCookie("token");
  console.log("cookie cleared");

  return res.json({ success: true, message: "Signout is succesfully done" });
});

module.exports = router;
