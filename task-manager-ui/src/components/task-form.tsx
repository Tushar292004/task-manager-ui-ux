"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useTaskStore } from "@/store/task-store"
import type { Task, TaskStatus } from "@/types/task"
import { MultiSelect } from "./multi-select"

interface TaskFormProps {
  task?: Task
  defaultStatus?: TaskStatus
  onComplete: () => void
}

function formatDateForInput(date: Date | string | undefined): string {
  if (!date) return ""
  const d = date instanceof Date ? date : new Date(date)
  return d.toISOString().split('T')[0]
}

export function TaskForm({ task, defaultStatus, onComplete }: TaskFormProps) {
  const { addTask, updateTask, members, columns } = useTaskStore()

  // Dynamically create the status enum from available columns
  const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    status: z.string(), // Allow any string for status to support custom columns
    assignees: z.array(z.string()).min(1, "At least one assignee is required"),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: task?.title ?? "",
      description: task?.description ?? "",
      status: task?.status ?? defaultStatus ?? columns[0]?.status ?? "backlog",
      assignees: task?.assignees ?? [],
      startDate: task?.startDate ? formatDateForInput(task.startDate) : "",
      endDate: task?.endDate ? formatDateForInput(task.endDate) : "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const taskData = {
      ...values,
      startDate: values.startDate ? new Date(values.startDate) : undefined,
      endDate: values.endDate ? new Date(values.endDate) : undefined,
    }

    if (task) {
      updateTask(task.id, taskData)
    } else {
      addTask(taskData)
    }
    form.reset()
    onComplete()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {columns.map((column) => (
                    <SelectItem key={column.id} value={column.status}>
                      {column.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="assignees"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assignees</FormLabel>
              <FormControl>
                <MultiSelect
                  selected={field.value}
                  options={members.map((member) => ({
                    value: member.id,
                    label: member.name,
                  }))}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} value={field.value ?? ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Date</FormLabel>
                <FormControl>
                  <Input className="" type="date" {...field} value={field.value ?? ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full bg-[#BA532D] text-white hover:text-[#BA532D]">
          {task ? "Update Task" : "Create Task"}
        </Button>
      </form>
    </Form>
  )
}

