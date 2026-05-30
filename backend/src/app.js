const express = require("express");
const cors = require("cors");

const app = express();

// Middlewares base
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Garage API is running 🚗" });
});

module.exports = app;

const db = require("./config/db");

app.get("/db-test", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1 + 1 AS result");
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const bookingRoutes = require("./routes/bookingRoutes");

app.use("/api/bookings", bookingRoutes);

const dashboardRoutes = require("./routes/dashboardRoutes");

app.use("/api/dashboard", dashboardRoutes);

const customerRoutes = require("./routes/customerRoutes");

app.use("/api/customers", customerRoutes);

const vehicleRoutes = require("./routes/vehicleRoutes");

app.use("/api/vehicles", vehicleRoutes);

const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);

const reportRoutes =
  require("./routes/reportRoutes");

app.use(
  "/api/reports",
  reportRoutes
);