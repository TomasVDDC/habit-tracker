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
    <div className="w-full overflow-x-auto">
      <div className="min-w-[320px]">
        <div className="flex justify-between items-center mb-4 px-2">
          <Button onClick={prevMonth} className="sm:px-4 px-2">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-lg sm:text-xl font-bold">
            {currentMonth.toLocaleString("default", { month: "long", year: "numeric" })}
          </h2>
          <Button onClick={nextMonth} className="sm:px-4 px-2">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center font-bold text-xs sm:text-sm">
              {day}
            </div>
          ))}
          {blanks.map((blank) => (
            <div key={`blank-${blank}`} className="h-16 sm:h-24"></div>
          ))}
          {days.map((day) => {
            const date = new Date(
              currentMonth.getFullYear(),
              currentMonth.getMonth(),
              day
            ).toLocaleDateString('en-CA')
            const isToday = new Date().toLocaleDateString('en-CA') === date
            return (
              <div 
                key={day} 
                className={`border p-1 sm:p-2 min-h-[4rem] sm:min-h-[6rem] flex flex-col ${
                  isToday ? 'border-2 border-gray-600' : ''
                }`}
              >
                <div className="font-bold text-xs sm:text-sm mb-1">{day}</div>
                <div className="flex-grow overflow-y-auto space-y-1">
                  {habits.map((habit) => {
                    const firstCompletionDate = habit.completedDates.length > 0 
                      ? habit.completedDates.sort()[0] 
                      : null;
                    
                    // Only show habit if there's at least one completion and current date is >= first completion
                    if (firstCompletionDate && date >= firstCompletionDate) {
                      return (
                        <div key={habit.id} className="text-xs sm:text-sm">
                          <div className={`w-full truncate p-1 sm:p-2 rounded ${habit.completedDates.includes(date) ? 'bg-red-100' : ''}`}>
                            <span className="truncate">{habit.name}</span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
