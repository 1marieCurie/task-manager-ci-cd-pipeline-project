
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// API health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    message: "Task Manager API is running!",
    status: "OK"
  });
});

// Database health check
app.get("/api/db-health", async (req, res) => {
  try {
    await pool.query("SELECT 1");

    res.status(200).json({
      message: "MySQL connection successful!",
      database: process.env.DB_NAME
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Database connection failed"
    });
  }
});

// Test-only database cleanup endpoint
app.delete("/api/test/reset", async (req, res) => {
  // Protect the development and production databases
  if (process.env.DB_NAME !== "task_manager_test_db") {
    return res.status(403).json({
      message: "Database reset is only allowed in the test database"
    });
  }

  try {
    await pool.query("DELETE FROM tasks");

    res.status(200).json({
      message: "Test database cleaned successfully"
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to clean test database"
    });
  }
});

// Task routes
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
