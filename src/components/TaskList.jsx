import { format } from "date-fns"

const API_URL = "https://task-api-m07f.onrender.com/tasks"

const TaskList = ({ loading, taskList, setTaskList }) => {
  if (loading) {
    return <p className="loading" aria-live="polite">Loading tasks...</p>
  }

  const onTaskCheckChange = async (task) => {
    const updatedTask = { ...task, isChecked: !task.isChecked }

    await fetch(`${API_URL}/${task._id}/check`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })

    setTaskList((prev) =>
      prev.map((t) => (t._id === task._id ? updatedTask : t))
    )
  }

  const sortedTasks = [...taskList]
    .sort((a, b) => b.date - a.date)
    .slice(0, 10)

  return (
    <section className="tasks" aria-label="Task list">
      {sortedTasks.length === 0 && (
        <p className="empty">No tasks yet. Add one above!</p>
      )}
      {sortedTasks.map((task) => (
        <div key={task._id} className={`task ${task.isChecked ? "task--checked" : ""}`}>
          <label className="task-label">
            <input
              type="checkbox"
              checked={task.isChecked}
              onChange={() => onTaskCheckChange(task)}
              aria-label={`Mark "${task.description}" as ${task.isChecked ? "incomplete" : "complete"}`}
            />
            <span className="task-description">{task.description}</span>
          </label>
          <time className="task-date" dateTime={new Date(task.date).toISOString()}>
            {format(new Date(task.date), "MMM d, yyyy 'at' HH:mm")}
          </time>
        </div>
      ))}
    </section>
  )
}

export default TaskList
