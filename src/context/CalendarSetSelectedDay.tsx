import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CalendarSetSelectedDay {

}

const CalendarDayTasksContext = createContext<CalendarSetSelectedDay | undefined>(undefined);

interface CalendarSetSelectedDayProps {
  children: ReactNode;
  currentDate: Date;
}

export const CalendarSetSelectedDayProvider: React.FC<CalendarSetSelectedDayProps> = ({ children }) => {

  return (
    <CalendarDayTasksContext.Provider value={{}}>
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
