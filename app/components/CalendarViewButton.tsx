"use client"
import { useRouter } from "next/navigation";

export default function CalendarView() {
  const router = useRouter();

  return (
    <div className="ml-auto mt-4">
      <button 
        className="learn-more"
        onClick={() => router.push('/calendar')}
      >
        <span className="circle" aria-hidden="true">
          <span className="icon arrow"></span>
        </span>
        <span className="button-text py-3 text-[#282936] font-bold leading-relaxed  uppercase text-right w-full">
          Calendar View
        </span>
      </button>
    </div>
  );
}