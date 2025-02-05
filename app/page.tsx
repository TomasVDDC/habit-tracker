"use client"
import Image from "next/image";
import HabitForm from "./components/HabitForm";
import HabitList from "./components/HabitList";
import CalendarViewButton from "./components/CalendarViewButton";
import PageHeader from "./components/PageHeader";
import { useHabits } from "./hooks/useHabits";

export default function Home() {
  const { habits, addHabit, toggleToday } = useHabits();

  return (
    <div className="grid grid-rows-[1fr_20px] justify-items-center min-h-screen p-8 gap-16 sm:p-20 font-smooch max-h-screen">
      <main className="flex flex-col row-start-1  h-full">
        <PageHeader />
        <div className="flex flex-col gap-6 my-auto">
           <HabitForm onAddHabit={addHabit} /> 
           <HabitList habits={habits} onToggleToday={toggleToday} />  
           <CalendarViewButton />
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
            src="/code_icon.svg"
            alt="Code icon"
            width={16}
            height={16}
          />
          See the code
        </a>
      </footer>
    </div>
  );
}
