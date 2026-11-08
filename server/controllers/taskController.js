
const pool = require("../config/db");

// GET: Retrieve all tasks
const getTasks = async (req, res) => {
  try {
    const [tasks] = await pool.execute(
      "SELECT * FROM tasks ORDER BY created_at DESC, id DESC"
    );

    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve tasks" });
  }
};

// POST: Create a new task
const createTask = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || typeof title !== "string" || !title.trim()) {
      return res.status(400).json({
        message: "Task title is required"
      });
    }

    const [result] = await pool.execute(
      "INSERT INTO tasks (title) VALUES (?)",
      [title.trim()]
    );

    const [tasks] = await pool.execute(
      "SELECT * FROM tasks WHERE id = ?",
      [result.insertId]
    );

    res.status(201).json(tasks[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create task" });
  }
};

// PATCH: Update task completion status
const updateTask = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { completed } = req.body;

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ message: "Invalid task ID" });
    }

    if (typeof completed !== "boolean") {
      return res.status(400).json({
        message: "Completed must be a boolean"
      });
    }

    const [existing] = await pool.execute(
      "SELECT id FROM tasks WHERE id = ?",
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    await pool.execute(
      "UPDATE tasks SET completed = ? WHERE id = ?",
      [completed, id]
    );

    const [tasks] = await pool.execute(
      "SELECT * FROM tasks WHERE id = ?",
      [id]
    );

    res.status(200).json(tasks[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update task" });
  }
};

// DELETE: Remove a task
const deleteTask = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ message: "Invalid task ID" });
    }

    const [result] = await pool.execute(
      "DELETE FROM tasks WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({
      message: "Task deleted successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete task" });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask
};
