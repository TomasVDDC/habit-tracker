import type { Habit } from "../types";

export default function HabitList({ habits, onToggleToday }: { habits: Habit[], onToggleToday: (id: string) => void }) {
  return (
    <div className="flex flex-col justify-center items-center gap-4 px-4">
      
      {habits.map((habit) => (
        <button
          onClick={() => !habit.completedToday && onToggleToday(habit.id)}
          className={`border-2 rounded-lg p-4 shadow-sm transition-shadow w-full max-w-md text-left ${
            habit.completedToday 
              ? 'bg-red-100 border-red-200 cursor-not-allowed' 
              : 'border-neutral-200 hover:shadow-md'
          }`}
          key={habit.id}
          disabled={habit.completedToday}
        >
          <h2 className="text-2xl">{habit.name}</h2>
          <p className="text-sm text-neutral-500">{habit.completedDates.length} days completed</p>
        </button>
      ))}
    </div>
  );
}