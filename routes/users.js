//bringing express and express router
const express = require("express");
const router = express.Router();

// @route:/user
router.get("/", (req, res) => {
  res.send("user-route");
});

module.exports = router;
