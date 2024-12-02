
import React from "react";
import { CreateDateReturnType, Holiday } from "../../../types"
import { CalendarDayTaskSetter } from "./CalendarDayTaskSetter";
import { useCalendarDayTasksContext } from "../../../context";
import { TaskItem } from "./TaskItem";
import { createDate } from "../../../utils/helpers/date";

interface RightBoardCalendarProps {
    selectedDate: CreateDateReturnType,
    holidayInformation?: Holiday;
    dateRangeWithHolidays?: undefined | Holiday[];
    selectedDateRange: {
        dateStartRange: null | ReturnType<typeof createDate>;
        endDate: null | ReturnType<typeof createDate>;
    }
}

export const RightBoard = ({ selectedDate, holidayInformation,  dateRangeWithHolidays, selectedDateRange}:RightBoardCalendarProps) => {

    const {dayWithTask} = useCalendarDayTasksContext()

    const holidaysInDateRange = React.useMemo(() => {
        if (!dateRangeWithHolidays || dateRangeWithHolidays.length === 0) return null;

        return(
            <>
                <h3 className="holliday__text text-violet text-4xl mb-4">Holiday this day's</h3>
                <ul>
                {dateRangeWithHolidays.map((day, index) => (
                    <li key={index} className="bg-black/[0.1] rounded-lg py-[5px] px-[10px] mb-4 text-xl text-txt-color"> 
                        {day.date.iso.split('T')[0]}: {day.name}
                    </li>))}
                </ul>
            </>
        )
        

    }, [dateRangeWithHolidays]);    

    const renderDayTasks = React.useMemo(() => {
        if (dayWithTask.length){
            return(
                <div className="task__wrapper relative h-full max-h-300px overflow-y-auto pr-2">
                    {dayWithTask.length && dayWithTask.findIndex(item => item.iso === selectedDate.iso) >= 0 
                    ? <h3 className="taskslist__text text-turquoise text-4xl mb-4 ">Tasks for Today</h3> 
                    : ''} 
                    {dayWithTask.map(day => {
                        if(day.iso === selectedDate.iso){  
                            return ( 
                                day.tasksListFortheDay?.map(task => <TaskItem key={task.id} task={task} day={day}/>)
                            )
                        }   
                    })}
                </div>
            )
        }else{
            return ('')
        }
    }, [dayWithTask, selectedDate])

    console.log('dayWithTask', dayWithTask)

    return (
        <>
            <div className="w-2/5 self-stretch p-20px relative overflow-hidden">
                <div className=" text-center text-txt-color mb-4">
                {selectedDateRange?.dateStartRange?.dayNumber && selectedDateRange?.endDate?.dayNumber ? (
                <div className="flex justify-center items-center gap-4">
                    <h1 className="text-[60px] leading-none">
                        {selectedDateRange.dateStartRange.dayNumber} {selectedDateRange.dateStartRange.dayShort}
                        <p className="text-base leading-none">{selectedDateRange.dateStartRange.monthShort} </p>
                    </h1>
                    <span className="text-[60px]">-</span>
                    <h1 className="text-[60px] leading-none">
                        {selectedDateRange.endDate.dayNumber} {selectedDateRange.endDate.dayShort}
                        <p className="text-xl leading-none">{selectedDateRange.endDate.monthShort} </p>
                    </h1>
                </div>
                ) : (
                <>
                    <h1 className="text-[130px] leading-none">{selectedDate.dayNumber}</h1>
                    <h2 className="text-3xl">{selectedDate.day}</h2>
                </>
                )}
                </div>
                {holidaysInDateRange || (holidayInformation?.name && 
                    <div className="text-txt-color">
                        <h3 className="holliday__text text-violet text-4xl mb-4 ">Holiday this day</h3>
                        <p className="bg-black/[0.1] rounded-lg py-[5px] px-[10px] mb-4 text-xl">{holidayInformation.name}</p>
                    </div>
                )}

                {renderDayTasks}
           
                {!selectedDateRange?.dateStartRange?.dayNumber && !selectedDateRange?.endDate?.dayNumber ? <CalendarDayTaskSetter /> : '' }
            </div>  
            
        </>
    )
}