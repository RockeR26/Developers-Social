//initialising dependencies
const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const User = require("../models/User");

// @route: GET /auth
// @desc:get details of user with valid token
// @acess:Protected

router.get("/", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");
    res.json(user);
  } catch (err) {
    console.error(error.message);
    res.status(500).json({ msg: "server error" });
  }
});

// @route: POST /auth
// @desc:add User
//@acess:public
router.post(
  "/",
  [
    check("email", "Enter a valid email").isEmail(),
    check("password", "Enter your password").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      //see if user exist
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid email or password" }] });
      }
      //check credentials
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid email or password" }] });
      }

      //get token from jwt
      const payload = {
        user: user.id,
      };
      jwt.sign(
        payload,
        config.get("secret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: "server error" });
    }
  }
);
module.exports = router;
