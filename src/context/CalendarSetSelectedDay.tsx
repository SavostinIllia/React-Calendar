import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CalendarSetSelectedDay {
    selectedDateContext: Date;
    selectDay: (day: Date) => void;
}

const CalendarSetSelectedDay = createContext<CalendarSetSelectedDay | undefined>(undefined);

interface CalendarSetSelectedDayProps {
  children: ReactNode;
  
}

export const CalendarSetSelectedDayProvider: React.FC<CalendarSetSelectedDayProps> = ({ children }) => {
    const [selectedDateContext, setSelectedDate] = useState(new Date())

    const selectDay = (day:Date) => {
        setSelectedDate(day)
    }

    return (
        <CalendarSetSelectedDay.Provider value={{selectedDateContext, selectDay}}>
            {children}
        </CalendarSetSelectedDay.Provider>
    );
};

export const useCalendarSetSelectedDayProvider = () => {
  const context = useContext(CalendarSetSelectedDay);
  if (!context) {
    throw new Error("useCalendarDayTasksContext must be used within a CalendarDayTasksContextProvider");
  }
  return context;
};
