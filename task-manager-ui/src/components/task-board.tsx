"use client"

import { DragDropContext, Droppable } from "@hello-pangea/dnd"
import { useCallback } from "react"
import type { TaskStatus } from "@/types/task"
import { useTaskStore } from "@/store/task-store"
import { TaskColumn } from "./task-column"
import { AddSectionDialog } from "./add-section-dialog"

export function TaskBoard() {
  const { moveTask, filterTasks, columns } = useTaskStore()

  const handleDragEnd = useCallback(
    (result: any) => {
      if (!result.destination) return

      const sourceStatus = result.source.droppableId as TaskStatus
      const destinationStatus = result.destination.droppableId as TaskStatus
      const taskId = result.draggableId

      if (sourceStatus !== destinationStatus) {
        moveTask(taskId, destinationStatus)
      }
    },
    [moveTask],
  )

  return (
    <div className="flex h-full flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Task Board</h1>
        <AddSectionDialog />
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {columns.map((column) => (
            <Droppable key={column.id} droppableId={column.status}>
              {(provided) => <TaskColumn column={column} tasks={filterTasks(column.status)} provided={provided} />}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  )
}

// export const useTaskStore = create<TaskState>()(
//   persist(
//     (set, get) => ({
//       tasks: new Map(),
//       columns: [
//         { id: "backlog", title: "Backlog", status: "backlog" },
//         { id: "in-progress", title: "In Progress", status: "in-progress" },
//         { id: "paused", title: "Paused", status: "paused" },
//         { id: "completed", title: "Ready for launch", status: "completed" },
//       ],
//       members: [
//         { id: "1", name: "John Doe", email: "john@example.com", avatar: "/placeholder.svg?height=40&width=40" },
//         { id: "2", name: "Jane Smith", email: "jane@example.com", avatar: "/placeholder.svg?height=40&width=40" },
//       ],
//       addTask: (task) => {
//         set((state) => {
//           const id = crypto.randomUUID()
//           const now = new Date()
//           const newTask: Task = {
//             ...task,
//             id,
//             createdAt: now,
//             updatedAt: now,
//           }
//           const newTasks = new Map(state.tasks)
//           newTasks.set(id, newTask)
//           return { tasks: newTasks }
//         })
//       },
//       updateTask: (id, updatedTask) => {
//         set((state) => {
//           const newTasks = new Map(state.tasks)
//           const task = newTasks.get(id)
//           if (task) {
//             newTasks.set(id, {
//               ...task,
//               ...updatedTask,
//               updatedAt: new Date(),
//             })
//           }
//           return { tasks: newTasks }
//         })
//       },
//       deleteTask: (id) => {
//         set((state) => {
//           const newTasks = new Map(state.tasks)
//           newTasks.delete(id)
//           return { tasks: newTasks }
//         })
//       },
//       moveTask: (taskId, newStatus) => {
//         set((state) => {
//           const newTasks = new Map(state.tasks)
//           const task = newTasks.get(taskId)
//           if (task) {
//             newTasks.set(taskId, {
//               ...task,
//               status: newStatus,
//               updatedAt: new Date(),
//             })
//           }
//           return { tasks: newTasks }
//         })
//       },
//       addColumn: (title) => {
//         set((state) => {
//           const id = crypto.randomUUID()
//           const status = title.toLowerCase().replace(/\s+/g, "-")
//           return {
//             columns: [...state.columns, { id, title, status }],
//           }
//         })
//       },
//       filterTasks: (status) => {
//         const { tasks } = get()
//         return Array.from(tasks.values()).filter((task) => task.status === status)
//       },
//     }),
//     {
//       name: "task-store",
//       serialize: (state) => JSON.stringify({
//         ...state,
//         tasks: Array.from(state.tasks.entries()), // Convert Map to Array before storing
//       }),
//       deserialize: (str) => {
//         const data = JSON.parse(str)
//         return {
//           ...data,
//           tasks: new Map(data.tasks), // Convert back to Map when loading
//         }
//       },
//     },
//   ),
// )
