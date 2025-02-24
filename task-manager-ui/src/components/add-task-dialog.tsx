"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { TaskForm } from "./task-form"
import type { TaskStatus } from "@/types/task"

interface AddTaskDialogProps {
  defaultStatus?: TaskStatus
  onClose?: () => void
}

export function AddTaskDialog({ defaultStatus, onClose }: AddTaskDialogProps) {
  const [open, setOpen] = useState(true)

  const handleOpenChange = (open: boolean) => {
    setOpen(open)
    if (!open && onClose) {
      onClose()
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px] border-[#BA532D]">
        <DialogHeader>
          <DialogTitle className="text-[#BA532D]">Add Task</DialogTitle>
          <DialogDescription>Create a new task by filling out the form below.</DialogDescription>
        </DialogHeader>
        <TaskForm defaultStatus={defaultStatus} onComplete={() => handleOpenChange(false)} />
      </DialogContent>
    </Dialog>
  )
}

