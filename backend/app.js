const express = require("express");
const app = express();
const routes = require("./routes/api/v1/gen/users");
const db = require("./config/db");

app.use(express.json());

app.use("/api/v1/gen/users", routes);

// first route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
