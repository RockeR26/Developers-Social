//requiring or intialising dependencies
const express = require("express");
const app = express();
const connectDB = require("./config/db");

//connecting to DB
connectDB();

app.get("/", (req, res) => {
  res.send("Im Server");
});
//getting routes
app.use("/user", require("./routes/users"));
app.use("/post", require("./routes/posts"));
app.use("/profile", require("./routes/profiles"));
app.use("/auth", require("./routes/auth"));

//application listening on follwing port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("server started on port " + PORT);
});
