
import React from "react";
import { CreateDateReturnType, Holiday } from "../../../types"
import { CalendarDayTaskSetter } from "./CalendarDayTaskSetter";
import { useCalendarDayTasksContext } from "../../../context";
import { TaskItem } from "./TaskItem";

interface RightBoardCalendarProps {
    selectedDate: CreateDateReturnType,
    holidayInformation?: Holiday;
    dateRangeWithHolidays?: undefined | Holiday[];
}


export const RightBoard = ({ selectedDate, holidayInformation,  dateRangeWithHolidays}:RightBoardCalendarProps) => {

    const {dayWithTask} = useCalendarDayTasksContext()

    const holidaysInDateRange = React.useMemo(() => {
        if (!dateRangeWithHolidays || dateRangeWithHolidays.length === 0) return null;

        return dateRangeWithHolidays.map((day, index) => (
            <div key={index}>{day.name}</div>
        ));
    }, [dateRangeWithHolidays]);    

    const renderDayTasks = React.useMemo(() => {
        if (dayWithTask.length){
            return dayWithTask.map(day => {
                if(day.iso === selectedDate.iso){  
                    return ( 
                        day.tasksListFortheDay?.map(task => <TaskItem key={task.id} task={task} day={day}/>)
                    )
                }   
            })
        } 
    }, [dayWithTask, selectedDate])


    return (
        <>
            <div className="w-2/5 self-stretch p-20px relative overflow-hidden">
                <div className="text-txt-color">
                    {selectedDate.day} <br /> 
                    {selectedDate.month} {selectedDate.dayNumber} 
                </div>
               
        
                {holidaysInDateRange || (holidayInformation?.name && <div>{holidayInformation.name}</div>)}
                {holidaysInDateRange}
                <div className="task-wrapper relative h-full max-h-410px overflow-y-auto">
                    {renderDayTasks}
                </div>
                <CalendarDayTaskSetter />
            </div>  
            
        </>
    )
}