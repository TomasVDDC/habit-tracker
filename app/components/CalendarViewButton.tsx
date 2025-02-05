"use client"
import { useRouter } from "next/navigation";

export default function CalendarView() {
  const router = useRouter();

  return (
    <div className="ml-auto">
      <button 
        className="learn-more"
        onClick={() => router.push('/calendar')}
      >
        <span className="circle" aria-hidden="true">
          <span className="icon arrow"></span>
        </span>
        <span className="button-text">Calendar View</span>
      </button>
    </div>
  );
}