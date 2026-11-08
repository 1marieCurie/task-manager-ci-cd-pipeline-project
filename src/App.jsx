import { useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')

  const addTask = () => {
    if (!newTask.trim()) return

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title: newTask,
        completed: false,
      },
    ])

    setNewTask('')
  }

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    )
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  return (
    <main className="container">
      <h1>Mini Task Manager</h1>
      <p>Manage your daily tasks.</p>

      <div className="task-form">
        <input
          data-cy="task-input"
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={(event) => setNewTask(event.target.value)}
        />

        <button data-cy="add-task" onClick={addTask}>
          Add Task
        </button>
      </div>

      <ul data-cy="task-list">
        {tasks.map((task) => (
          <li key={task.id} data-cy="task-item">
            <span
              data-cy="task-title"
              className={task.completed ? 'completed' : ''}
              onClick={() => toggleTask(task.id)}
            >
              {task.title}
            </span>

            <button
              data-cy="delete-task"
              onClick={() => deleteTask(task.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {tasks.length === 0 && (
        <p data-cy="empty-message">No tasks yet.</p>
      )}
    </main>
  )
}

export default App