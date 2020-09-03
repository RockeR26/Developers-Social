//requiring or intialising dependencies
const express = require("express");
const app = express();
const connectDB = require("./config/db");

//connecting to DB
connectDB();

//adding body parser
app.use(express.json({ extended: false }));

// @route: GET /
// @desc:SERVER HOME ROUTE
// @acess:PUBLIC
app.get("/", (req, res) => {
  res.send("Im Server");
});

//routes of server
app.use("/user", require("./routes/users"));
app.use("/post", require("./routes/posts"));
app.use("/profile", require("./routes/profiles"));
app.use("/auth", require("./routes/auth"));

//application listening on follwing port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("server started on port " + PORT);
});
