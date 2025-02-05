import { useState } from "react"
import type { Habit } from "../types"
import { Button } from "@/app/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CalendarViewProps {
  habits: Habit[]
}

export default function CalendarView({ habits }: CalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay()

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i)

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Button onClick={prevMonth} >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-bold">
          {currentMonth.toLocaleString("default", { month: "long", year: "numeric" })}
        </h2>
        <Button onClick={nextMonth} >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center font-bold">
            {day}
          </div>
        ))}
        {blanks.map((blank) => (
          <div key={`blank-${blank}`} className="h-24"></div>
        ))}
        {days.map((day) => {
          const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day).toISOString().split("T")[0]
          return (
            <div key={day} className="border p-2 min-h-[6rem] flex flex-col">
              <div className="font-bold mb-1">{day}</div>
              <div className="flex-grow overflow-y-auto space-y-1">
                {habits.map((habit) => (
                  <div key={habit.id} className="text-sm">
                    <div className={`w-full truncate p-2 rounded ${habit.completedDates.includes(date) ? 'bg-neutral-100' : ''}`}>
                      <span className="truncate">{habit.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
