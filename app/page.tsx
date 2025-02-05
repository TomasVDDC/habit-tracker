"use client"
import Image from "next/image";
import HabitForm from "./components/HabitForm";
import HabitList from "./components/HabitList";
import CalendarView from "./components/CalendarViewButton";
import { useHabits } from "./hooks/useHabits";

export default function Home() {
  const { habits, addHabit, toggleToday } = useHabits();

  return (
    <div className="grid grid-rows-[1fr_20px] justify-items-center min-h-screen p-8 gap-16 sm:p-20 font-smooch max-h-screen">
      <main className="flex flex-col row-start-1  h-full">
        <h1 className="text-9xl font-bold">Habit Tracker</h1>
        <p className="text-2xl text-neutral-600">A simple habit tracker, with a focus on data privacy</p>
        <div className="flex flex-col gap-6 my-auto">
           <HabitForm onAddHabit={addHabit} /> 
           <HabitList habits={habits} onToggleToday={toggleToday} />  
           <CalendarView />
        </div>
      </main>
      <footer className="flex gap-6 flex-wrap items-center justify-center row-start-2">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
