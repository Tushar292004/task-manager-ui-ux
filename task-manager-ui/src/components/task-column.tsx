"use client"

import { Draggable } from "@hello-pangea/dnd"
import type { Column, Task } from "@/types/task"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TaskCard } from "./task-card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { AddTaskDialog } from "./add-task-dialog"
import { useState } from "react"

interface TaskColumnProps {
  column: Column
  tasks: Task[]
  provided: any
}

export function TaskColumn({ column, tasks, provided }: TaskColumnProps) {
  const [showAddTask, setShowAddTask] = useState(false)

  return (
    <Card className="flext   flex-col bg-muted/50">
      <CardHeader className="flex-none p-4">
        <CardTitle className="flex items-center justify-between text-sm font-medium">
          {column.title}
          <span className="rounded-full bg-muted px-2 py-1 text-xs">{tasks.length}</span>
        </CardTitle>
      </CardHeader>
      <CardContent
        {...provided.droppableProps}
        ref={provided.innerRef}
        className="flex-1 space-y-2 overflow-y-auto p-2"
      >
        {tasks.map((task, index) => (
          <Draggable key={task.id} draggableId={task.id} index={index}>
            {(provided) => <TaskCard task={task} provided={provided} />}
          </Draggable>
        ))}
        {provided.placeholder}
      </CardContent>
      <div className="flex-none p-2">
        {showAddTask ? (
          <AddTaskDialog defaultStatus={column.status} onClose={() => setShowAddTask(false)} />
        ) : (
          <Button variant="ghost" className="w-full justify-start" onClick={() => setShowAddTask(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add a card
          </Button>
        )}
      </div>
    </Card>
  )
}

