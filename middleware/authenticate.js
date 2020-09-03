const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  // get token from header x-auth-token
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ msg: "unauthorized" });
  }
  //   verify token
  try {
    const decode = jwt.verify(token, config.get("secret"));
    req.user = decode.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "invalid token" });
  }
};
