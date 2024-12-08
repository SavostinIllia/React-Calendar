import React from "react";
import { CreateDateReturnType, Holiday, EventListItem } from "../../../types";
import { CalendarDayEventSetter } from "./CalendarDayEventSetter";
import { useCalendarDayEventsContext } from "../../../context";
import { DayEventItem } from "./DayEventItem";
import { createDate } from "../../../utils/helpers/date";

interface RightBoardCalendarProps {
    selectedDate: CreateDateReturnType;
    holidayInformation?: Holiday;
    dateRangeWithHolidays?: Holiday[] | undefined;
    dateRangeWithEvents?: CreateDateReturnType[] | undefined;
    selectedDateRange: {
        dateStartRange: ReturnType<typeof createDate> | null;
        endDate: ReturnType<typeof createDate> | null;
    };
    dateGetRange: Date[];
}

export const RightBoard = ({
    selectedDate,
    holidayInformation,
    dateRangeWithHolidays,
    selectedDateRange,
    dateGetRange,
}: RightBoardCalendarProps) => {
    const { dayWithEvent } = useCalendarDayEventsContext();

    const holidaysContainerRef = React.useRef<HTMLDivElement | null>(null);
    const calendarBoardContainerRef = React.useRef<HTMLDivElement | null>(null);

    const [availableHeight, setAvailableHeight] = React.useState<number | null>(null);

    const eventsInDateRange = React.useMemo(() => {

        if (
            !dayWithEvent ||
            dayWithEvent.length === 0 ||
            !selectedDateRange.dateStartRange ||
            !selectedDateRange.endDate ||
            dateGetRange.length === 0
        ) {
            return [];
        }

        return dateGetRange.reduce<CreateDateReturnType[]>((acc, day) => {
            const matchingEvent = dayWithEvent.find(
                (event) =>
                    `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, "0")}-${String(
                        day.getDate()
                    ).padStart(2, "0")}` === event.iso
            );
            if (matchingEvent) {
                acc.push(matchingEvent);
            }
            return acc;
        }, []);
    }, [dateGetRange, selectedDateRange, dayWithEvent]);

    const holidaysInDateRange = React.useMemo(() => {
        if (!dateRangeWithHolidays?.length) return null;
        
        return (
            <div className="mb-[20px]" ref={holidaysContainerRef}>
                <h3 className="holliday__text text-violet text-4xl mb-4">Holiday this day's</h3>
                <ul className="list__wrapper relative h-auto overflow-y-auto pr-2 py-2">
                    {dateRangeWithHolidays.map((holiday) => (
                        <li
                            key={holiday.date.iso}  
                            className="bg-black/[0.1] rounded-lg py-[5px] px-[10px] mb-4 text-xl text-txt-color"
                        >
                            {holiday.date.iso.split("T")[0]}: {holiday.name}
                        </li>
                    ))}
                </ul>
            </div>
        );

        
    }, [dateRangeWithHolidays]);


    const renderEventsList = (eventList: EventListItem[] | undefined, day?: CreateDateReturnType, ) => {
        return eventList && eventList.map((event) => (
            <li key={event.id} className="event__item flex basis-full text-txt-color w-full justify-start gap-[10px] mb-5 py-[5px] px-[10px] bg-black/[0.1] rounded-lg z-10 last:mb-0">
                <DayEventItem event={event} day={day} />
            </li>
        ));
    }


    const renderDayEvents = React.useMemo(() => {
        const todayEvents = dayWithEvent.find((day) => day.iso === selectedDate.iso);

        if (!todayEvents?.eventsListForTheDay?.length) return null;

        return (
            <div className='event__wrapper relative h-auto'>
                <h3 className="eventslist__text text-turquoise text-3xl mb-2 pb-3 flex justify-between"> Event's for Today - {todayEvents.eventsListForTheDay.length}</h3>
                <ul className="list__wrapper overflow-y-auto pr-2 mb-3" style={{maxHeight: `${availableHeight}px`}}>
                        {renderEventsList(todayEvents.eventsListForTheDay, todayEvents)}
                </ul>
            </div>
        );
    }, [dayWithEvent, selectedDate, holidayInformation, availableHeight]);

    const renderEventsInDateRange = React.useMemo(() => {
        if (!eventsInDateRange.length) return;
       
        const eventsCount : number = eventsInDateRange.reduce((acc, day)  => {
            return acc += (day.eventsListForTheDay ? day.eventsListForTheDay.length : 0);
        }, 0)

        return (
            <div className='event__wrapper h-auto '>
                <h3 className="eventslist__text text-turquoise text-3xl mb-2 pb-3 flex justify-between">Event's in range - {eventsCount}</h3>
                <div  className="overflow-y-auto test" style={{maxHeight: `${availableHeight}px`}}>
                {eventsInDateRange.map((day) => (
                    <ul className='h-full pr-2 mb-4' key={day.iso}>
                    <>
                        <p className="text-txt-color text-2xl mb-2">{day.iso}</p>
                        {renderEventsList(day?.eventsListForTheDay, day)}
                    </>
                    </ul>
                ))}   
                </div>        
            </div>
        );
    }, [eventsInDateRange]);

    React.useLayoutEffect(() => {
        const calculateHeight = () => {
         
            const containerHeight = calendarBoardContainerRef.current && calendarBoardContainerRef.current.offsetHeight - 32 ;  
            const selectedDateHeight = (calendarBoardContainerRef.current?.querySelector('.date__title') as HTMLElement)?.offsetHeight  + 20;
            const eventFormHeight = (calendarBoardContainerRef.current?.querySelector('form') as HTMLElement)?.offsetHeight || 0;
            const holidaysHeight = holidaysContainerRef.current && holidaysContainerRef.current.offsetHeight + 20 || 0;
            let remainingHeight = 0;

            if(eventFormHeight > 0) {
                remainingHeight = containerHeight ? containerHeight - selectedDateHeight - eventFormHeight - holidaysHeight - 40 : 0
                
            }else{

                remainingHeight = containerHeight ? containerHeight - selectedDateHeight - eventFormHeight - holidaysHeight - 20  : 0
            }

            setAvailableHeight((prev) => (prev !== remainingHeight ? remainingHeight : prev));
        
        };
    
        calculateHeight(); 
    
        window.addEventListener("resize", calculateHeight);
    
        return () => {
            window.removeEventListener("resize", calculateHeight);
        };
    }, [holidaysContainerRef, selectedDateRange, selectedDate]);


    return (
        <div className="w-2/5 self-stretch mx-[20px] mt-[20px] mb-3 relative" ref={calendarBoardContainerRef}>
            <div className="text-center text-txt-color mb-4 date__title" >
                {selectedDateRange.dateStartRange && selectedDateRange.endDate ? (
                    <div className="flex justify-center items-center gap-4">
                        <h1 className="text-[55px] leading-none">
                            {selectedDateRange.dateStartRange.dayNumber}{" "}
                            {selectedDateRange.dateStartRange.dayShort}
                            <p className="text-base leading-none">
                                {selectedDateRange.dateStartRange.monthShort}
                            </p>
                        </h1>
                        <span className="text-[55px]">-</span>
                        <h1 className="text-[55px] leading-none">
                            {selectedDateRange.endDate.dayNumber}{" "}
                            {selectedDateRange.endDate.dayShort}
                            <p className="text-xl leading-none">
                                {selectedDateRange.endDate.monthShort}
                            </p>
                        </h1>
                    </div>
                ) : (
                    <>
                        <h1 className="text-[130px] leading-none">{selectedDate.dayNumber}</h1>
                        <h2 className="text-3xl">{selectedDate.day}</h2>
                    </>
                )}
            </div>
            
            {holidaysInDateRange ||
                (holidayInformation?.name && (
                    <div className="text-txt-color mb-5" ref={holidaysContainerRef}>
                        <h3 className="holliday__text text-violet text-4xl mb-4">Holiday this day</h3>
                        <p className="bg-black/[0.1] rounded-lg py-[5px] px-[10px] text-xl">
                            {holidayInformation.name}
                        </p>
                    </div>
                ))}

            {renderEventsInDateRange || renderDayEvents}

            {!selectedDateRange.dateStartRange && !selectedDateRange.endDate && (
                <CalendarDayEventSetter />
            )}
        </div>
    );
};
