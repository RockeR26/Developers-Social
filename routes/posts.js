//bringing express and express router
const express = require("express");
const router = express.Router();

// @route:/post
router.get("/", (req, res) => {
  res.send("post-route");
});

module.exports = router;
