const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./config/db");
require("dotenv").config();
const cron = require("node-cron");
const appointmentController = require("./controllers/appointmentControllers");
const session = require("express-session");
//const auth = require("./config/auth");

app.use(express.json());

// Enable CORS
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = [
      process.env.FRONTEND_URL, // Your production URL from .env
      'http://localhost:5173'   // Development
    ].filter(Boolean);

    // Regex to match any Vercel preview URL for this project
    const vercelPreviewRegex = /^https:\/\/beauty-appointment-system-.*\.vercel\.app$/;
    
    if (!origin || allowedOrigins.includes(origin) || vercelPreviewRegex.test(origin)) {
      callback(null, true);
    } else {
      console.error(`CORS error: Origin ${origin} not allowed.`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'cache-control', 'pragma', 'Accept'],
  exposedHeaders: ['Set-Cookie']
}));

// Enable trust proxy - CRITICAL for secure cookies behind a proxy
app.set('trust proxy', 1);

// Session configuration
app.use(session({ 
  secret: process.env.JWT_SECRET, 
  resave: true,
  saveUninitialized: true,
  name: 'session_name', 
  cookie: {
    secure: true, 
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: 'none',
    path: '/'
  },
  proxy: true
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
