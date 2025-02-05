"use client"
import CalendarView from "../components/CalendarView";
import PageHeader from "../components/PageHeader";
import Footer from "../components/Footer";
import { useHabits } from "../hooks/useHabits";

export default function CalendarPage() {
  const { habits } = useHabits();

  return (
    <div className="grid grid-rows-[1fr_20px] justify-items-center min-h-screen p-8 gap-16 sm:p-20 font-smooch max-h-screen">
      <main className="flex flex-col row-start-1 h-full">
        <PageHeader />
        <CalendarView habits={habits} />
      </main>
      <Footer />
    </div>
  );
}