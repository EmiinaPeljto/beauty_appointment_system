const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./config/db");
require("dotenv").config();
const cron = require("node-cron");
const appointmentController = require("./controllers/appointmentControllers");

app.use(express.json());

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from your frontend
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    credentials: true, // Allow cookies if needed
  })
);

const userRoutes = require("./routes/api/v1/gen/users");
const supportRequestRoutes = require("./routes/api/v1/gen/supportRequests");
const salonRoutes = require("./routes/api/v1/gen/salons");
const reviewRoutes = require("./routes/api/v1/gen/reviews");
const serviceRoutes = require("./routes/api/v1/gen/services");
const categoryRoutes = require("./routes/api/v1/gen/categories");
const favouriteRoutes = require("./routes/api/v1/gen/favourites");
const appointmentRoutes = require("./routes/api/v1/gen/appointments");
const invoiceRoutes = require("./routes/api/v1/gen/invoices");
const protectedRoutes = require("./routes/api/v1/gen/protected");
const emailVerificationsRoutes = require("./routes/api/v1/gen/emailVerifications");

app.use("/api/v1/gen/users", userRoutes);
app.use("/api/v1/gen/supportRequests", supportRequestRoutes);
app.use("/api/v1/gen/salons", salonRoutes);
app.use("/api/v1/gen/reviews", reviewRoutes);
app.use("/api/v1/gen/services", serviceRoutes);
app.use("/api/v1/gen/categories", categoryRoutes);
app.use("/api/v1/gen/favourites", favouriteRoutes);
app.use("/api/v1/gen/appointments", appointmentRoutes);
app.use("/api/v1/gen/invoices", invoiceRoutes);
app.use("/api/v1/gen/protected", protectedRoutes);
app.use("/api/v1/gen/emailVerifications", emailVerificationsRoutes);

// Set up cron job to run every 15 minutes
cron.schedule("*/15 * * * *", async () => {
  try {
    console.log(
      `[${new Date().toISOString()}] Running scheduled appointment status update...`
    );
    const updatedCount = await appointmentController.updatePastAppointments();
    console.log(
      `[${new Date().toISOString()}] Updated ${updatedCount} appointments to Completed status`
    );
  } catch (error) {
    console.error(
      `[${new Date().toISOString()}] Scheduled appointment status update failed:`,
      error
    );
  }
});

// first route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");

  // Delay the initial check with a longer delay
  setTimeout(() => {
    console.log("Running initial appointment status check...");
    appointmentController
      .updatePastAppointments()
      .then((count) => {
        console.log(
          `Initial check: Updated ${count} appointments to Completed status`
        );
      })
      .catch((error) => {
        console.error("Initial appointment status update failed:", error);
      });
  }, 10000); // Using 10 seconds instead of 3 to reduce lock conflicts
});
