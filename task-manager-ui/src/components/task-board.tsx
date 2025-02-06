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
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl ">Task Board</h1>
        <AddSectionDialog />
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
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

