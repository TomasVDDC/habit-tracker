import { useState } from "react"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"

interface HabitFormProps {
  onAddHabit: (name: string) => void
}

export default function HabitForm({ onAddHabit }: HabitFormProps) {
  const [habitName, setHabitName] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (habitName.trim()) {
      onAddHabit(habitName.trim())
      setHabitName("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <Input
        type="text"
        value={habitName}
        onChange={(e) => setHabitName(e.target.value)}
        placeholder="New habit"
        className="mr-2"
      />
      <Button type="submit">Add</Button>
    </form>
  )
}