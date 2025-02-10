"use client"
import Image from "next/image";
import HabitForm from "./components/HabitForm";
import HabitList from "./components/HabitList";
import CalendarViewButton from "./components/CalendarViewButton";
import PageHeader from "./components/PageHeader";
import Footer from "./components/Footer";
import { useHabits } from "./hooks/useHabits";

export default function Home() {
  const { habits, addHabit, toggleToday, deleteHabit } = useHabits();

  return (
    <div className="grid grid-rows-[1fr_20px] justify-items-center min-h-screen p-8 gap-16 sm:p-20 font-smooch max-h-screen">
      <main className="flex flex-col row-start-1  h-full">
        <PageHeader />
        <div className="flex flex-col gap-6 mb-auto">
           <HabitForm onAddHabit={addHabit} /> 
           <HabitList 
             habits={habits} 
             onToggleToday={toggleToday}
             onDeleteHabit={deleteHabit}
           />  
           <CalendarViewButton />
        </div>
      </main>
      <Footer />
    </div>
  );
}
