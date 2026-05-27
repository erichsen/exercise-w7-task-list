import { useState, useEffect } from "react"
import TaskForm from "./TaskForm"
import TaskList from "./TaskList"

const API_URL = "https://task-api-m07f.onrender.com/tasks"

export const Tasks = () => {
  const [taskList, setTaskList] = useState([])
  const [loading, setLoading] = useState(false)
  const [newTodo, setNewTodo] = useState("")

  const fetchTasks = async () => {
    setLoading(true)
    const response = await fetch(API_URL)
    const data = await response.json()
    setTaskList(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const handleNewTodoChange = (e) => {
    setNewTodo(e.target.value)
  }

  const onFormSubmit = async (e) => {
    e.preventDefault()
    if (!newTodo.trim()) return

    setLoading(true)
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description: newTodo }),
    })
    setNewTodo("")
    await fetchTasks()
  }

  return (
    <div className="wrapper">
      <TaskForm
        newTodo={newTodo}
        onNewTodoChange={handleNewTodoChange}
        onFormSubmit={onFormSubmit}
      />
      <TaskList
        loading={loading}
        taskList={taskList}
        setTaskList={setTaskList}
      />
    </div>
  )
}
