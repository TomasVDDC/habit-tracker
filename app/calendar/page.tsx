"use client"
import CalendarView from "../components/CalendarView";
import { useHabits } from "../hooks/useHabits";

export default function CalendarPage() {
  const { habits } = useHabits();

  return (
    <div className="grid grid-rows-[1fr_20px] justify-items-center min-h-screen p-8 gap-16 sm:p-20 font-smooch max-h-screen">
      <main className="flex flex-col row-start-1 h-full">
        <h1 className="text-9xl font-bold">Habit Tracker</h1>
        <p className="text-2xl text-neutral-600">A simple habit tracker, with a focus on data privacy</p>
        <CalendarView habits={habits} />
      </main>
    </div>
  );
}