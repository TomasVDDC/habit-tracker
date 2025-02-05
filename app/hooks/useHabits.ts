import { useState, useEffect } from 'react';
import type { Habit } from '../types';

// Create a single shared instance of habits
let globalHabits: Habit[] | null = null;

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>(() => {
    // If we already have global habits, use those
    if (globalHabits) return globalHabits;
    
    // Otherwise try to load from localStorage (only happens once)
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('habits');
      if (stored) {
        globalHabits = JSON.parse(stored);
        return globalHabits ?? [];
      }
    }
    return [];
  });

  const addHabit = (name: string) => {
    const newHabits = [...habits, { 
      id: Date.now().toString(), 
      name, 
      completedDates: [], 
      completedToday: false 
    }];
    setHabits(newHabits);
    globalHabits = newHabits;
  };

  const toggleToday = (id: string) => {
    const newHabits = habits.map(habit => 
      habit.id === id ? {
        ...habit,
        completedDates: [...habit.completedDates, new Date().toISOString()],
        completedToday: true
      } : habit
    );
    setHabits(newHabits);
    globalHabits = newHabits;
  };

  // Save habits to localStorage whenever they change
  useEffect(() => {
    if (habits.length > 0 || globalHabits !== null) {
      localStorage.setItem('habits', JSON.stringify(habits));
      globalHabits = habits;
    }
  }, [habits]);

  // Reset completedToday flag daily
  useEffect(() => {
    const resetCompletedToday = () => {
      setHabits(currentHabits => {
        const newHabits = currentHabits.map(habit => {
          const lastCompletedDate = habit.completedDates[habit.completedDates.length - 1];
          if (!lastCompletedDate) return habit;

          const lastCompleted = new Date(lastCompletedDate).setHours(0, 0, 0, 0);
          const today = new Date().setHours(0, 0, 0, 0);

          return lastCompleted < today ? 
            { ...habit, completedToday: false } : 
            habit;
        });
        globalHabits = newHabits;
        return newHabits;
      });
    };

    resetCompletedToday();
    const interval = setInterval(resetCompletedToday, 1000 * 3600);
    return () => clearInterval(interval);
  }, []);

  return { habits, addHabit, toggleToday };
} 