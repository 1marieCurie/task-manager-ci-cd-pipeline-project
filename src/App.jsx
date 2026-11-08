
import { useEffect, useMemo, useState } from 'react'
import {
  Activity,
  Bell,
  CalendarDays,
  Check,
  CheckCircle2,
  Circle,
  ClipboardList,
  Clock3,
  LayoutDashboard,
  ListTodo,
  Plus,
  Search,
  Settings,
  Sparkles,
  Target,
  Trash2,
  TrendingUp,
  X,
} from 'lucide-react'

import './App.css'

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from './services/taskService'

function App() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [addingTask, setAddingTask] = useState(false)

  // Retrieve tasks from the backend
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await getTasks()
        setTasks(data)
      } catch (err) {
        setError('Unable to load your tasks. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    loadTasks()
  }, [])

  // Task statistics
  const totalTasks = tasks.length
  const completedTasks = tasks.filter(task => task.completed).length
  const activeTasks = totalTasks - completedTasks
  const completionRate = totalTasks
    ? Math.round((completedTasks / totalTasks) * 100)
    : 0

  // Create a task
  const addTask = async (event) => {
    event.preventDefault()

    if (!newTask.trim() || addingTask) return

    try {
      setError('')
      setAddingTask(true)

      const createdTask = await createTask(newTask.trim())

      setTasks(currentTasks => [createdTask, ...currentTasks])
      setNewTask('')
      setFilter('all')
      setSearch('')
    } catch (err) {
      setError('Unable to create your task. Please try again.')
    } finally {
      setAddingTask(false)
    }
  }

  // Toggle task completion
  const toggleTask = async (id) => {
    const selectedTask = tasks.find(task => task.id === id)

    if (!selectedTask) return

    try {
      setError('')

      const updatedTask = await updateTask(
        id,
        !selectedTask.completed
      )

      setTasks(currentTasks =>
        currentTasks.map(task =>
          task.id === id ? updatedTask : task
        )
      )
    } catch (err) {
      setError('Unable to update your task. Please try again.')
    }
  }

  // Delete a task
  const handleDeleteTask = async (id) => {
    try {
      setError('')

      await deleteTask(id)

      setTasks(currentTasks =>
        currentTasks.filter(task => task.id !== id)
      )
    } catch (err) {
      setError('Unable to delete your task. Please try again.')
    }
  }

  // Filter and search tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesFilter =
        filter === 'all' ||
        (filter === 'active' && !task.completed) ||
        (filter === 'completed' && task.completed)

      const matchesSearch = task.title
        .toLowerCase()
        .includes(search.toLowerCase())

      return matchesFilter && matchesSearch
    })
  }, [tasks, filter, search])

  const filterOptions = [
    { id: 'all', label: 'All tasks', count: totalTasks },
    { id: 'active', label: 'In progress', count: activeTasks },
    { id: 'completed', label: 'Completed', count: completedTasks },
  ]

  return (
    <div className="app-shell">

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">
            <Target size={23} strokeWidth={2.4} />
          </div>

          <div>
            <span className="brand-name">TaskPilot</span>
            <span className="brand-caption">PRODUCTIVITY WORKSPACE</span>
          </div>
        </div>

        <div className="sidebar-section">
          <span className="sidebar-label">WORKSPACE</span>

          <div className="sidebar-link active">
            <LayoutDashboard size={18} />
            <span>My Tasks</span>
          </div>
        </div>

        <div className="sidebar-section">
          <span className="sidebar-label">YOUR OVERVIEW</span>

          <div className="sidebar-stat">
            <div className="sidebar-stat-icon blue">
              <ListTodo size={17} />
            </div>
            <div>
              <span>Total tasks</span>
              <strong>{totalTasks}</strong>
            </div>
          </div>

          <div className="sidebar-stat">
            <div className="sidebar-stat-icon green">
              <CheckCircle2 size={17} />
            </div>
            <div>
              <span>Completed</span>
              <strong>{completedTasks}</strong>
            </div>
          </div>
        </div>

        <div className="sidebar-bottom">
          <div className="sidebar-help">
            <div className="help-icon">
              <Sparkles size={18} />
            </div>
            <strong>Stay productive</strong>
            <p>Small steps lead to big achievements.</p>
          </div>

          <div className="sidebar-footer">
            <div className="profile-avatar">TP</div>
            <div className="profile-info">
              <strong>My Workspace</strong>
              <span>Personal account</span>
            </div>
            <Settings size={17} className="profile-settings" />
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="main-content">

        {/* Topbar */}
        <header className="topbar">
          <div className="breadcrumb">
            Workspace <span>/</span> <strong>My Tasks</strong>
          </div>

          <div className="topbar-actions">
            <div className="topbar-date">
              <CalendarDays size={16} />
              <span>
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            </div>

            <button
              className="icon-button"
              type="button"
              aria-label="Notifications"
              title="Notifications"
            >
              <Bell size={18} />
              <span className="notification-dot" />
            </button>
          </div>
        </header>

        <div className="dashboard-container">

          {/* Page heading */}
          <section className="page-heading">
            <div>
              <div className="eyebrow">
                <Sparkles size={14} />
                YOUR PRODUCTIVITY SPACE
              </div>

              <h1>My Tasks</h1>
              <p>Organize your work, focus on what matters, and get things done.</p>
            </div>

            <div className="heading-date">
              <Clock3 size={16} />
              <span>One task at a time.</span>
            </div>
          </section>

          {/* Statistics */}
          <section className="stats-grid">

            <div className="stat-card">
              <div className="stat-card-top">
                <span>Total tasks</span>
                <div className="stat-icon blue">
                  <ClipboardList size={19} />
                </div>
              </div>
              <strong className="stat-value">{totalTasks}</strong>
              <span className="stat-description">Tasks in your workspace</span>
            </div>

            <div className="stat-card">
              <div className="stat-card-top">
                <span>In progress</span>
                <div className="stat-icon orange">
                  <Activity size={19} />
                </div>
              </div>
              <strong className="stat-value">{activeTasks}</strong>
              <span className="stat-description">Tasks waiting to be completed</span>
            </div>

            <div className="stat-card">
              <div className="stat-card-top">
                <span>Completed</span>
                <div className="stat-icon green">
                  <CheckCircle2 size={19} />
                </div>
              </div>
              <strong className="stat-value">{completedTasks}</strong>
              <span className="stat-description">Tasks successfully completed</span>
            </div>

            <div className="stat-card progress-card">
              <div className="stat-card-top">
                <span>Completion rate</span>
                <div className="stat-icon purple">
                  <TrendingUp size={19} />
                </div>
              </div>
              <strong className="stat-value">{completionRate}%</strong>
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ width: `${completionRate}%` }}
                />
              </div>
              <span className="stat-description">Your overall progress</span>
            </div>

          </section>

          {/* Task workspace */}
          <section className="task-panel">

            <div className="task-panel-heading">
              <div>
                <h2>Task overview</h2>
                <p>Manage and track your daily activities.</p>
              </div>

              <div className="task-count">
                <span className="count-dot" />
                {activeTasks} active
              </div>
            </div>

            {/* Task creation */}
            <form className="task-form" onSubmit={addTask}>
              <div className="task-input-wrapper">
                <Plus size={19} className="input-plus" />

                <input
                  data-cy="task-input"
                  type="text"
                  placeholder="What needs to be done?"
                  value={newTask}
                  onChange={event => setNewTask(event.target.value)}
                  aria-label="New task title"
                />

                {newTask && (
                  <button
                    type="button"
                    className="clear-input"
                    onClick={() => setNewTask('')}
                    aria-label="Clear task input"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              <button
                data-cy="add-task"
                type="submit"
                className="add-task-button"
                disabled={loading || addingTask || !newTask.trim()}
              >
                <Plus size={17} />
                {addingTask ? 'Adding...' : 'Add task'}
              </button>
            </form>

            {/* Error message */}
            {error && (
              <div className="error-message" data-cy="api-error" role="alert">
                {error}
              </div>
            )}

            {/* Task filters and search */}
            <div className="task-toolbar">

              <div className="filter-tabs">
                {filterOptions.map(option => (
                  <button
                    key={option.id}
                    type="button"
                    data-cy={`filter-${option.id}`}
                    className={`filter-tab ${filter === option.id ? 'selected' : ''}`}
                    onClick={() => setFilter(option.id)}
                  >
                    {option.label}
                    <span className="filter-count">{option.count}</span>
                  </button>
                ))}
              </div>

              <div className="search-wrapper">
                <Search size={16} />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={search}
                  onChange={event => setSearch(event.target.value)}
                  aria-label="Search tasks"
                />
              </div>

            </div>

            {/* Loading */}
            {loading && (
              <div className="loading-state" data-cy="loading-message">
                <div className="loading-spinner" />
                <span>Loading your tasks...</span>
              </div>
            )}

            {/* Task list */}
            {!loading && (
              <ul className="task-list" data-cy="task-list">

                {filteredTasks.map(task => (
                  <li
                    key={task.id}
                    className={`task-item ${task.completed ? 'task-completed' : ''}`}
                    data-cy="task-item"
                  >
                    <button
                      type="button"
                      className={`task-check ${task.completed ? 'checked' : ''}`}
                      onClick={() => toggleTask(task.id)}
                      aria-label={task.completed ? 'Mark as active' : 'Mark as completed'}
                      title={task.completed ? 'Mark as active' : 'Mark as completed'}
                    >
                      {task.completed
                        ? <Check size={15} />
                        : <Circle size={19} />
                      }
                    </button>

                    <div className="task-details">
                      <span
                        data-cy="task-title"
                        className={`task-title ${task.completed ? 'completed' : ''}`}
                        onClick={() => toggleTask(task.id)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault()
                            toggleTask(task.id)
                          }
                          }}
                          >
                          {task.title}
                      </span>

                      <span className="task-meta">
                        <span className={`task-status ${task.completed ? 'status-completed' : 'status-active'}`}>
                          {task.completed ? 'Completed' : 'In progress'}
                        </span>
                      </span>
                    </div>

                    <button
                      type="button"
                      data-cy="delete-task"
                      className="delete-button"
                      onClick={() => handleDeleteTask(task.id)}
                      aria-label={`Delete ${task.title}`}
                      title="Delete task"
                    >
                      <Trash2 size={17} />
                    </button>
                  </li>
                ))}

              </ul>
            )}

            {/* Empty states */}
            {!loading && tasks.length === 0 && (
              <div className="empty-state" data-cy="empty-message">
                <div className="empty-icon">
                  <ClipboardList size={27} />
                </div>
                <h3>No tasks yet</h3>
                <p>Your workspace is clear. Add your first task to get started.</p>
              </div>
            )}

            {!loading && tasks.length > 0 && filteredTasks.length === 0 && (
              <div className="empty-state" data-cy="no-filtered-tasks">
                <div className="empty-icon">
                  <Search size={25} />
                </div>
                <h3>No matching tasks</h3>
                <p>Try changing your filter or search for something else.</p>
              </div>
            )}

            {/* Panel footer */}
            {!loading && filteredTasks.length > 0 && (
              <div className="task-panel-footer">
                <span>
                  Showing {filteredTasks.length} of {totalTasks} tasks
                </span>
                <span className="footer-status">
                  <CheckCircle2 size={14} />
                  Synced with database
                </span>
              </div>
            )}

          </section>

          <footer className="dashboard-footer">
            <span>© {new Date().getFullYear()} TaskPilot</span>
            <span>Designed for focus. Built for productivity.</span>
          </footer>

        </div>
      </main>
    </div>
  )
}

export default App
