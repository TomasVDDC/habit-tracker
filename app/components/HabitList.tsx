import type { Habit } from "../types";

export default function HabitList({ 
  habits, 
  onToggleToday, 
  onDeleteHabit 
}: { 
  habits: Habit[], 
  onToggleToday: (id: string) => void,
  onDeleteHabit: (id: string) => void 
}) {
  return (
    <div className="flex flex-col gap-4 px-4">
      {habits.map((habit) => (
        <div key={habit.id} className="flex items-center gap-4 w-full max-w-md">
          <button
            onClick={() => {
              if (window.confirm(`Are you sure you want to delete "${habit.name}"?`)) {
                onDeleteHabit(habit.id);
              }
            }}
            className="delete-button"
            aria-label={`Delete ${habit.name}`}
          >
            <svg 
              viewBox="0 0 448 512" 
              className="delete-icon"
            >
              <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
            </svg>
          </button>
          <button
            onClick={() => !habit.completedToday && onToggleToday(habit.id)}
            className={`flex-1 border-2 rounded-lg p-4 shadow-sm transition-shadow text-left ${
              habit.completedToday 
                ? 'bg-red-100 border-red-200 cursor-not-allowed' 
                : 'border-neutral-200 hover:shadow-md'
            }`}
            disabled={habit.completedToday}
          >
            <h2 className="text-2xl">{habit.name}</h2>
            <p className="text-sm text-neutral-500">{habit.completedDates.length} days completed</p>
          </button>
        </div>
      ))}
    </div>
  );
}