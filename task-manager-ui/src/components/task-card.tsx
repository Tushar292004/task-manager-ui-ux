"use client"

import type { Task } from "@/types/task"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useTaskStore } from "@/store/task-store"
import { EditTaskDialog } from "./edit-task-dialog"
import { format } from "date-fns"

interface TaskCardProps {
  task: Task
  provided: any
}

export function TaskCard({ task, provided }: TaskCardProps) {
  const members = useTaskStore((state) => state.members)
  const assignees = members.filter((member) => task.assignees.includes(member.id))

  return (
    <Card ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="bg-card">
      <CardHeader className="p-3">
        <CardTitle className="flex items-start justify-between text-sm font-medium">
          <span>{task.title}</span>
          <EditTaskDialog task={task} />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        {task.description && <p className="mb-2 text-sm text-muted-foreground">{task.description}</p>}
        <div className="flex items-center justify-between">
          <div className="flex -space-x-2">
            {assignees.map((assignee) => (
              <Avatar key={assignee.id} className="h-6 w-6 border-2 border-background">
                <AvatarImage src={assignee.avatar} alt={assignee.name} />
                <AvatarFallback>{assignee.name[0]}</AvatarFallback>
              </Avatar>
            ))}
          </div>
          {task.endDate && (
            <span className="text-xs text-muted-foreground">{format(new Date(task.endDate), "MMM d")}</span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

