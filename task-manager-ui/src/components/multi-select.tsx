"use client"

import * as React from "react"
import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface Option {
  value: string
  label: string
}

interface MultiSelectProps {
  selected: string[]
  options: Option[]
  onChange: (values: string[]) => void
  className?: string
}

export function MultiSelect({ selected, options, onChange, className }: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)

  const selectedOptions = options.filter((option) => selected.includes(option.value))

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          className={cn(
            "flex min-h-[2.5rem] w-full flex-wrap gap-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
            className,
          )}
        >
          {selectedOptions.map((option) => (
            <Badge key={option.value} variant="secondary" className="rounded-sm px-1 font-normal">
              {option.label}
              <button
                type="button"
                className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    onChange(selected.filter((value) => value !== option.value))
                  }
                }}
                onMouseDown={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
                onClick={() => onChange(selected.filter((value) => value !== option.value))}
              >
                <X className="h-3 w-3 text-[#BA532D] hover:text-foreground" />
              </button>
            </Badge>
          ))}
          <button type="button" className="text-sm text-muted-foreground" onClick={() => setOpen(true)}>
            {selected.length === 0 ? "Select members..." : "Add more..."}
          </button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search members..." />
          <CommandList>
            <CommandEmpty>No members found.</CommandEmpty>
            <CommandGroup className="max-h-[200px] overflow-auto">
              {options.map((option) => {
                const isSelected = selected.includes(option.value)
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      onChange(
                        isSelected ? selected.filter((value) => value !== option.value) : [...selected, option.value],
                      )
                    }}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-[#BA532D]",
                        isSelected ? "bg-[#BA532D] text-primary-foreground" : "opacity-50 [&_svg]:invisible",
                      )}
                    >
                      <span className="h-4 w-4 flex justify-center items-center font-bold text-xs">✓</span>
                    </div>
                    {option.label}
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

