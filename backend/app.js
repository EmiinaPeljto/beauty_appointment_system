const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./config/db");

app.use(express.json());

// Enable CORS
app.use(cors({
  origin: "http://localhost:5173", // Allow requests from your frontend
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  credentials: true // Allow cookies if needed
}));

const userRoutes = require("./routes/api/v1/gen/users");
const supportRequestRoutes = require("./routes/api/v1/gen/supportRequests");
const salonRoutes = require("./routes/api/v1/gen/salons");
const reviewRoutes = require("./routes/api/v1/gen/reviews");
const serviceRoutes = require("./routes/api/v1/gen/services");
const categoryRoutes = require("./routes/api/v1/gen/categories");
const favouriteRoutes = require("./routes/api/v1/gen/favourites");
const appointmentRoutes = require("./routes/api/v1/gen/appointments");
const invoiceRoutes = require("./routes/api/v1/gen/invoices");


app.use("/api/v1/gen/users", userRoutes);
app.use("/api/v1/gen/supportRequests", supportRequestRoutes);
app.use("/api/v1/gen/salons", salonRoutes);
app.use("/api/v1/gen/reviews", reviewRoutes);
app.use("/api/v1/gen/services", serviceRoutes);
app.use("/api/v1/gen/categories", categoryRoutes);
app.use("/api/v1/gen/favourites", favouriteRoutes);
app.use("/api/v1/gen/appointments", appointmentRoutes);
app.use("/api/v1/gen/invoices", invoiceRoutes);

// first route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
