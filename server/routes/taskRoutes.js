
const express = require("express");
const router = express.Router();

const {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} = require("../controllers/taskController");

// GET /api/tasks
router.get("/", getTasks);

// POST /api/tasks
router.post("/", createTask);

// PATCH /api/tasks/:id
router.patch("/:id", updateTask);

// DELETE /api/tasks/:id
router.delete("/:id", deleteTask);

module.exports = router;
