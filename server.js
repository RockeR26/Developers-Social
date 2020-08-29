//requiring or intialising dependencies
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Im Server");
});

//application listening on follwing port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("server started on port " + PORT);
});
