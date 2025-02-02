import { create } from "zustand"
import type { Task, TaskStatus, Member, Column } from "@/types/task"
import { persist } from "zustand/middleware"

interface TaskState {
  tasks: Map<string, Task>
  columns: Column[]
  members: Member[]
  addTask: (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => void
  updateTask: (id: string, task: Partial<Task>) => void
  deleteTask: (id: string) => void
  moveTask: (taskId: string, newStatus: TaskStatus) => void
  addColumn: (title: string) => void
  filterTasks: (status: TaskStatus) => Task[]
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      tasks: new Map(),
      columns: [
        { id: "backlog", title: "Backlog", status: "backlog" },
        { id: "in-progress", title: "In Progress", status: "in-progress" },
        { id: "paused", title: "Paused", status: "paused" },
        { id: "completed", title: "Ready for launch", status: "completed" },
      ],
      members: [
        { id: "1", name: "John Doe", email: "john@example.com", avatar: "/placeholder.svg?height=40&width=40" },
        { id: "2", name: "Jane Smith", email: "jane@example.com", avatar: "/placeholder.svg?height=40&width=40" },
      ],
      addTask: (task) => {
        set((state) => {
          const id = crypto.randomUUID()
          const now = new Date()
          const newTask: Task = {
            ...task,
            id,
            createdAt: now,
            updatedAt: now,
          }
          const newTasks = new Map(state.tasks)
          newTasks.set(id, newTask)
          return { tasks: newTasks }
        })
      },
      updateTask: (id, updatedTask) => {
        set((state) => {
          const newTasks = new Map(state.tasks)
          const task = newTasks.get(id)
          if (task) {
            newTasks.set(id, {
              ...task,
              ...updatedTask,
              updatedAt: new Date(),
            })
          }
          return { tasks: newTasks }
        })
      },
      deleteTask: (id) => {
        set((state) => {
          const newTasks = new Map(state.tasks)
          newTasks.delete(id)
          return { tasks: newTasks }
        })
      },
      moveTask: (taskId, newStatus) => {
        set((state) => {
          const newTasks = new Map(state.tasks)
          const task = newTasks.get(taskId)
          if (task) {
            newTasks.set(taskId, {
              ...task,
              status: newStatus,
              updatedAt: new Date(),
            })
          }
          return { tasks: newTasks }
        })
      },
      addColumn: (title) => {
        set((state) => {
          const id = crypto.randomUUID()
          const status = title.toLowerCase().replace(/\s+/g, "-")
          return {
            columns: [...state.columns, { id, title, status }],
          }
        })
      },
      filterTasks: (status) => {
        const { tasks } = get()
        return Array.from(tasks.values()).filter((task) => task.status === status)
      },
    }),
    {
      name: "task-store",
    },
  ),
)

