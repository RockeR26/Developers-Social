//requiring or intialising dependencies
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const path = require("path");
const { read } = require("fs");

//connecting to DB
connectDB();

//adding body parser
app.use(express.json({ extended: false }));

// @route: GET /
// @desc:SERVER HOME ROUTE
// @acess:PUBLIC

//routes of server
app.use("/user", require("./routes/users"));
app.use("/post", require("./routes/posts"));
app.use("/profile", require("./routes/profiles"));
app.use("/auth", require("./routes/auth"));

//static assets in prod
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    read.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//application listening on follwing port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("server started on port " + PORT);
});
