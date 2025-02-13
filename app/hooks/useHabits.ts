import { useState, useEffect } from 'react';
import type { Habit } from '../types';

// Keep global state outside of hook
let globalHabits: Habit[] | null = null;

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load habits from localStorage or global state only once on mount
  useEffect(() => {
    if (globalHabits) {
      setHabits(globalHabits);
    } else {
      const stored = localStorage.getItem('habits');
      if (stored) {
        const parsedHabits = JSON.parse(stored);
        globalHabits = parsedHabits;
        setHabits(parsedHabits);
      }
    }
    setIsInitialized(true);
  }, []);

  const addHabit = (name: string) => {
    const newHabits = [...habits, { 
      id: Date.now().toString(), 
      name, 
      completedDates: [], 
      completedToday: false 
    }];
    setHabits(newHabits);
    globalHabits = newHabits;
    localStorage.setItem('habits', JSON.stringify(newHabits));
  };

  const toggleToday = (id: string) => {
    const today = new Date();
    const localDate = today.toLocaleDateString('en-CA'); // Format: YYYY-MM-DD

    const newHabits = habits.map(habit => 
      habit.id === id ? {
        ...habit,
        completedDates: [...habit.completedDates, localDate],
        completedToday: true
      } : habit
    );
    setHabits(newHabits);
    globalHabits = newHabits;
    localStorage.setItem('habits', JSON.stringify(newHabits));
  };

  // Reset completedToday flag daily
  useEffect(() => {
    if (!isInitialized) return;

    const resetCompletedToday = () => {
      setHabits(currentHabits => {
        const today = new Date();
        const localToday = today.toLocaleDateString('en-CA');

        const newHabits = currentHabits.map(habit => {
          const lastCompletedDate = habit.completedDates[habit.completedDates.length - 1];
          if (!lastCompletedDate) return habit;

          return lastCompletedDate < localToday ? 
            { ...habit, completedToday: false } : 
            habit;
        });
        globalHabits = newHabits;
        localStorage.setItem('habits', JSON.stringify(newHabits));
        return newHabits;
      });
    };

    resetCompletedToday();
    const interval = setInterval(resetCompletedToday, 1000 * 3600);
    return () => clearInterval(interval);
  }, [isInitialized]);

  const deleteHabit = (id: string) => {
    const newHabits = habits.filter(habit => habit.id !== id);
    setHabits(newHabits);
    globalHabits = newHabits;
    localStorage.setItem('habits', JSON.stringify(newHabits));
  };

  return { habits, addHabit, toggleToday, deleteHabit };
} 