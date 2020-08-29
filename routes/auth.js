//bringing express and express router
const express = require("express");
const router = express.Router();

// @route:/auth
router.get("/", (req, res) => {
  res.send("auth-route");
});

module.exports = router;
