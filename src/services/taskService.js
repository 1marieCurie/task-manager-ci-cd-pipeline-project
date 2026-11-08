
const API_URL = "http://localhost:5000/api/tasks";

// Retrieve all tasks
export const getTasks = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  const tasks = await response.json();

  // MySQL BOOLEAN values can arrive as 0 or 1
  return tasks.map(task => ({
    ...task,
    completed: Boolean(task.completed)
  }));
};

// Create a task
export const createTask = async (title) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title })
  });

  if (!response.ok) {
    throw new Error("Failed to create task");
  }

  const task = await response.json();

  return {
    ...task,
    completed: Boolean(task.completed)
  };
};

// Update task completion
export const updateTask = async (id, completed) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ completed })
  });

  if (!response.ok) {
    throw new Error("Failed to update task");
  }

  const task = await response.json();

  return {
    ...task,
    completed: Boolean(task.completed)
  };
};

// Delete a task
export const deleteTask = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    throw new Error("Failed to delete task");
  }

  return response.json();
};
