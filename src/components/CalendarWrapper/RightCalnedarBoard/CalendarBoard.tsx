
import React from "react";
import { Holiday } from "../../../types"

interface RightBoardCalendarProps {
    selectedDate: Date,
    selectedMonth: string,
    holidayInformation?: Holiday;
    dateRangeWithHolidays?: undefined | Holiday[]
}


export const RightBoard = ({ selectedDate, selectedMonth, holidayInformation,  dateRangeWithHolidays}:RightBoardCalendarProps) => {

    const holidaysInDateRange = React.useMemo(() => {
        if (!dateRangeWithHolidays || dateRangeWithHolidays.length === 0) return null;

        return dateRangeWithHolidays.map((day, index) => (
            <div key={index}>{day.description}</div>
        ));
    }, [dateRangeWithHolidays]); 


    return (
        <div className="w-2/5">
            {selectedMonth} <br />
            {selectedDate.getDate()} 
            {!holidaysInDateRange  && holidayInformation?.description}
            {holidaysInDateRange}
        </div>
    )
}