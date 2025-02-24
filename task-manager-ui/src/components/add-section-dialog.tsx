"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useTaskStore } from "@/store/task-store"
import { Plus } from "lucide-react"

export function AddSectionDialog() {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const addColumn = useTaskStore((state) => state.addColumn)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim()) {
      addColumn(title)
      setTitle("")
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-dashed rounded-xl border-[#BA532D] ">
          <Plus className="mr-2 h-4 w-4" />
          Add Section
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] border-[#BA532D]">
        <DialogHeader>
          <DialogTitle className="text-[#BA532D]">Add Section</DialogTitle>
          <DialogDescription>Create a new section to organize your tasks.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input placeholder="Enter section title..." value={title} onChange={(e) => setTitle(e.target.value)} />
          <Button type="submit" className="w-full bg-[#BA532D] text-white hover:text-[#BA532D]">
            Create Section
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

