import React, { createContext, useContext, useState, ReactNode } from 'react';
import { createDate } from '../utils/helpers/date';
import { CreateDateReturnType } from '../types';

interface CalendarDayTasksContextParams {
  currentDayWithTask: CreateDateReturnType;
  setTaskForCurrentDay: (day: CreateDateReturnType) => void;
  setTaskForSelectedDay: (val: string) => void;
  dayWithTask: CreateDateReturnType[]
}

const CalendarDayTasksContext = createContext<CalendarDayTasksContextParams | undefined>(undefined);

interface CalendarDayTasksContextProps {
  children: ReactNode;
  currentDate: Date;
}

export const CalendarDayTasksContextProvider: React.FC<CalendarDayTasksContextProps> = ({ children }) => {
  const [currentDayWithTask, setCurrentDay] = useState<CreateDateReturnType>(() => createDate({date : new Date()}));
  const [dayWithTask, setDayWithTask] = useState<CreateDateReturnType[]>([])

  const setTaskForCurrentDay = (day: CreateDateReturnType) => {
    setCurrentDay(() => createDate(day));
  };

  const setTaskForSelectedDay = (val: string) => {
    const newTask = { task: val };
  
    setDayWithTask((prev) => {
    
      const existingDay = prev.find((item) => item.iso === currentDayWithTask.iso);
  
      if (existingDay) {
        return prev.map((item) =>
          item.iso === currentDayWithTask.iso
            ? { ...item, newTask: [...(item.newTask || []), newTask] }
            : item
        );
      } else {

        return [...prev, { ...currentDayWithTask, newTask: [newTask] }];
      }
    });
  };

  return (
    <CalendarDayTasksContext.Provider value={{ currentDayWithTask, setTaskForCurrentDay,  setTaskForSelectedDay, dayWithTask }}>
      {children}
    </CalendarDayTasksContext.Provider>
  );
};

export const useCalendarDayTasksContext = () => {
  const context = useContext(CalendarDayTasksContext);
  if (!context) {
    throw new Error("useCalendarDayTasksContext must be used within a CalendarDayTasksContextProvider");
  }
  return context;
};
