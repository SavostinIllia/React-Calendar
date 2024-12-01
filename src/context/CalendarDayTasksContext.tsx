import React, { createContext, useContext, useState, ReactNode } from 'react';
import { createDate } from '../utils/helpers/date';
import { CreateDateReturnType } from '../types';

interface CalendarDayTasksContextParams {
  setCurrentDayFromCalendar: (day: CreateDateReturnType) => void;
  setTaskForSelectedDay: (val: string) => void;
  dayWithTask: CreateDateReturnType[];
  removeTaskFromCurrentDay: (day:CreateDateReturnType, id:number) => void
}

const CalendarDayTasksContext = createContext<CalendarDayTasksContextParams | undefined>(undefined);

interface CalendarDayTasksContextProps {
  children: ReactNode;
  currentDate: Date;
}

export const CalendarDayTasksContextProvider: React.FC<CalendarDayTasksContextProps> = ({ children }) => {
  const [currentDay, setCurrentDay] = useState<CreateDateReturnType>(() => createDate({date : new Date()}));
  const [dayWithTask, setDayWithTask] = useState<CreateDateReturnType[]>([])

  const setCurrentDayFromCalendar = (day: CreateDateReturnType) => {
    setCurrentDay(() => createDate(day));
  };

  const setTaskForSelectedDay = (val: string) => {
    const tasksListFortheDay = { 
      task: val ,
      time: new Date().toLocaleTimeString([], {
        hourCycle: 'h23',
        hour: '2-digit',
        minute: '2-digit'
    }),
      id: currentDay.timeStamp + Math.floor(Math.random() * 1000)
    };
  
    setDayWithTask((prev) => {
  
      const existingDay = prev.find((item) => item.iso === currentDay.iso);
  
      if (existingDay) {
        return prev.map((item) =>
          item.iso === currentDay.iso
            ? { ...item, tasksListFortheDay: [...(item.tasksListFortheDay || []), tasksListFortheDay] }
            : item
        );
      } else {

        return [...prev, { ...currentDay, tasksListFortheDay: [tasksListFortheDay] }];
      }
    });
  };

  const removeTaskFromCurrentDay = (day: CreateDateReturnType, taskId: number) => {
    debugger
    setDayWithTask((prevDayWithTask) =>
      prevDayWithTask.map((item) =>
        item.iso === day.iso
          ? { ...item, tasksListFortheDay: item.tasksListFortheDay?.filter((task) => task.id !== taskId) }
          : item
      )
    );
  };


  

  return (
    <CalendarDayTasksContext.Provider value={{ setCurrentDayFromCalendar,  setTaskForSelectedDay, dayWithTask, removeTaskFromCurrentDay }}>
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
