const express = require("express");
const app = express();
const db = require("./config/db");

app.use(express.json());

const userRoutes = require("./routes/api/v1/gen/users");
const supportRequestRoutes = require("./routes/api/v1/gen/supportRequests");
const salonRoutes = require("./routes/api/v1/gen/salons");
const reviewRoutes = require("./routes/api/v1/gen/reviews");
const serviceRoutes = require("./routes/api/v1/gen/services");
const categoryRoutes = require("./routes/api/v1/gen/categories"); 
const favouriteRoutes = require("./routes/api/v1/gen/favourites");

app.use("/api/v1/gen/users", userRoutes);
app.use("/api/v1/gen/supportRequests", supportRequestRoutes);
app.use("/api/v1/gen/salons", salonRoutes);
app.use("/api/v1/gen/reviews", reviewRoutes);
app.use("/api/v1/gen/services", serviceRoutes);
app.use("/api/v1/gen/categories", categoryRoutes);
app.use("/api/v1/gen/favourites", favouriteRoutes);

// first route
app.get("/", (req, res) => {
  res.send("Hello World!");
});



app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
