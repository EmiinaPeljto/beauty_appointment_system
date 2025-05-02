const express = require("express");
const app = express();
const db = require("./config/db");

app.use(express.json());

const userRoutes = require("./routes/api/v1/gen/users");
const supportRequestRoutes = require("./routes/api/v1/gen/supportRequests");
const salonRoutes = require("./routes/api/v1/gen/salons");

app.use("/api/v1/gen/users", userRoutes);
app.use("/api/v1/gen/supportRequests", supportRequestRoutes);
app.use("/api/v1/gen/salons", salonRoutes);

// first route
app.get("/", (req, res) => {
  res.send("Hello World!");
});



app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
