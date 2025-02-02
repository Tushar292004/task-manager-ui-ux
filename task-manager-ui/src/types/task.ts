export type TaskStatus = "backlog" | "in-progress" | "paused" | "completed" | string

export type Task = {
  id: string
  title: string
  description?: string
  status: TaskStatus
  assignees: string[]
  startDate?: Date
  endDate?: Date
  createdAt: Date
  updatedAt: Date
}

export type Column = {
  id: string
  title: string
  status: TaskStatus
}

export type Member = {
  id: string
  name: string
  email: string
  avatar: string
}

