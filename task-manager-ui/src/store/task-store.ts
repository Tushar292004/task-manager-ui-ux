import { create } from "zustand"
import type { Task, TaskStatus, Member, Column } from "@/types/task"
import { persist } from "zustand/middleware"

interface TaskState {
  tasks: Record<string, Task> 
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
      tasks: {},
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
          return { 
            tasks: {
              ...state.tasks,
              [id]: newTask
            }
          }
        })
      },
      updateTask: (id, updatedTask) => {
        set((state) => {
          if (!state.tasks[id]) return state
          
          return { 
            tasks: {
              ...state.tasks,
              [id]: {
                ...state.tasks[id],
                ...updatedTask,
                updatedAt: new Date(),
              }
            }
          }
        })
      },
      deleteTask: (id) => {
        set((state) => {
          const newTasks = { ...state.tasks }
          delete newTasks[id]
          return { tasks: newTasks }
        })
      },
      moveTask: (taskId, newStatus) => {
        set((state) => {
          if (!state.tasks[taskId]) return state

          return {
            tasks: {
              ...state.tasks,
              [taskId]: {
                ...state.tasks[taskId],
                status: newStatus,
                updatedAt: new Date(),
              }
            }
          }
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
        return Object.values(tasks).filter((task) => task.status === status)
      },
    }),
    {
      name: "task-store",
    },
  ),
)

