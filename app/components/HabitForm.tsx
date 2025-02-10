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
    <form onSubmit={handleSubmit} className="flex items-center w-full max-w-2xl">
      <Input
        type="text"
        value={habitName}
        onChange={(e) => setHabitName(e.target.value)}
        placeholder="New habit"
        className="mr-4 h-12 text-lg"
      />
      <Button type="submit" className="h-12 px-8 text-lg">Add</Button>
    </form>
  )
}