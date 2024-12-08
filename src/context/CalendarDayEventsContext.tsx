import React, { createContext, useContext, useState, ReactNode } from 'react';
import { createDate } from '../utils/helpers/date';
import { CreateDateReturnType, EventListItem } from '../types';

interface CalendarDayEventsContextParams {
  setCurrentDayFromCalendar: (day: CreateDateReturnType) => void;
  setEventForSelectedDay: (val: string) => void;
  dayWithEvent: CreateDateReturnType[];
  removeEventFromCurrentDay: (day:CreateDateReturnType, id:number) => void
}

const CalendarDayEventsContext = createContext<CalendarDayEventsContextParams | undefined>(undefined);

interface CalendarDayEventsContextProps {
  children: ReactNode;
}

export const CalendarDayEventsContextProvider: React.FC<CalendarDayEventsContextProps> = ({ children }) => {
  const [currentDay, setCurrentDay] = useState<CreateDateReturnType>(() => createDate({date : new Date()}));
  const [dayWithEvent, setDayWithEvent] = useState<CreateDateReturnType[]>([])

  const setCurrentDayFromCalendar = (day: CreateDateReturnType) => {
    setCurrentDay(() => createDate(day));
  };

  const setEventForSelectedDay = (val: string) => {
    const eventsListForTheDay: EventListItem = { 
      event: val ,
      time: new Date().toLocaleTimeString([], {
        hourCycle: 'h23',
        hour: '2-digit',
        minute: '2-digit'
    }),
      id: currentDay.timeStamp + Math.floor(Math.random() * 1000)
    };
  
    setDayWithEvent((prev) => {
  
      const existingDay = prev.find((item) => item.iso === currentDay.iso);
      
      if (existingDay) {
        return prev.map((item) =>
          item.iso === currentDay.iso
            ? { ...item, eventsListForTheDay: [...(item.eventsListForTheDay || []), eventsListForTheDay] }
            : item
        );
      } else {
        return [...prev, { ...currentDay, eventsListForTheDay: [eventsListForTheDay] }];
      }
    });
  };

  const removeEventFromCurrentDay = (day: CreateDateReturnType, eventId: number) => {
    
    setDayWithEvent((prevDayWithEvent) =>
      prevDayWithEvent
        .map((item) => {
          debugger
          if (item.iso === day.iso) {
            const updatedEvents = item.eventsListForTheDay?.filter((event) => event.id !== eventId) || [];
            return updatedEvents.length > 0
              ? { ...item, eventsListForTheDay: updatedEvents }
              : { ...item, eventsListForTheDay: undefined };
          }
          return item;
        })
        .filter((item) => item.eventsListForTheDay !== undefined)
    );
  };
  

  return (
    <CalendarDayEventsContext.Provider value={{ setCurrentDayFromCalendar,  setEventForSelectedDay, dayWithEvent, removeEventFromCurrentDay }}>
      {children}
    </CalendarDayEventsContext.Provider>
  );
};

export const useCalendarDayEventsContext = () => {
  const context = useContext(CalendarDayEventsContext);
  if (!context) {
    throw new Error("useCalendarDayEventsContext must be used within a CalendarDayEventsContextProvider");
  }
  return context;
};
