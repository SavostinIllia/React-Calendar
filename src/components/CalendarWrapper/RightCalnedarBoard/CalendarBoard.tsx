
import React from "react";
import { Holiday } from "../../../types"
import { CalendarDayTaskSetter } from "./CalendarDayTaskSetter";

interface RightBoardCalendarProps {
    selectedDate: Date,
    selectedMonth: string,
    holidayInformation?: Holiday;
    dateRangeWithHolidays?: undefined | Holiday[];
    taskArr? :any;
}


export const RightBoard = ({ selectedDate, selectedMonth, holidayInformation,  dateRangeWithHolidays, taskArr}:RightBoardCalendarProps) => {

    const holidaysInDateRange = React.useMemo(() => {
        if (!dateRangeWithHolidays || dateRangeWithHolidays.length === 0) return null;

        return dateRangeWithHolidays.map((day, index) => (
            <div key={index}>{day.name}</div>
        ));
    }, [dateRangeWithHolidays]); 

  
    return (
        <>
            <div className="w-2/5">
                {selectedMonth} <br />
                {selectedDate.getDate()} 
                {!holidaysInDateRange  && holidayInformation?.name}
                {holidaysInDateRange}
            </div>  
            <CalendarDayTaskSetter/>
        </>
    )
}