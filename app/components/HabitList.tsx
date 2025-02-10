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
    <div className="flex flex-col gap-4">
      {habits.map((habit) => (
        <div key={habit.id} className="flex items-center gap-4 w-full max-w-md">
          <button
            onClick={() => !habit.completedToday && onToggleToday(habit.id)}
            className={`flex-1 border-2 rounded-lg p-4 shadow-sm transition-shadow text-left ${
              habit.completedToday 
                ? 'bg-red-100 border-red-200 cursor-not-allowed' 
                : 'border-neutral-200 hover:shadow-md'
            }`}
            disabled={habit.completedToday}
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl">{habit.name}</h2>
                <p className="text-sm text-neutral-500">{habit.completedDates.length} days completed</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (window.confirm(`Are you sure you want to delete "${habit.name}"?`)) {
                    onDeleteHabit(habit.id);
                  }
                }}
                className="delete-button"
                aria-label={`Delete ${habit.name}`}
              >
                <svg 
                  viewBox="0 0 24 24"
                  className="delete-icon w-3 h-3 sm:w-4 sm:h-4"
                >
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                </svg>
              </button>
            </div>
          </button>
        </div>
      ))}
    </div>
  );
}