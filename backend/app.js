const express = require("express");
const app = express();
const userRoutes = require("./routes/api/v1/gen/users");
const supportRequestRoutes = require("./routes/api/v1/gen/supportRequests");
const db = require("./config/db");

app.use(express.json());

app.use("/api/v1/gen/users", userRoutes);

// first route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1/gen/supportRequests", supportRequestRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
