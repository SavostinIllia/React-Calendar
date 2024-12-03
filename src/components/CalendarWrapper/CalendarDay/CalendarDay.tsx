import { CalendarDayProps } from "../../../types"

export const CalendarDay:React.FC<CalendarDayProps> = ({
    day,
    currentDate,
    isSelectedDay,
    isAdditionalDay,
    checkInRange,
    holiday,
    startRangeDate,
    endRangeDate,
    tasksListFortheDay,

 }) => {
        return (
            <div 
            className={[
                'date p-[20px] rounded-full w-[35px] h-[35px] border-2 border-transparent flex items-center justify-center relative text-txt-color font-semibold transition z-10 hover:cursor-pointer ',
                currentDate ? 'border-current-day' : '',
                isSelectedDay ? 'is__selected' : '',
                isAdditionalDay ? 'opacity-40' : '',
                checkInRange ? 'date_in_range !opacity-100 text-white' : '',
                holiday ? '' : '',
                startRangeDate ? "start_range" : '',
                endRangeDate ? "end_range overflow-hidden !opacity-100" : '',
                tasksListFortheDay ? 'day__with_task' : '',
                ].join(' ')}
            >
            {holiday && <span className="day__holiday absolute rounded-md w-[5px] h-[5px] top-3 right-3 bg-flat-orange ">&nbsp;</span>}
            {tasksListFortheDay && <span className="day__task absolute rounded-md w-[5px] h-[5px] top-1 right-1 bg-board-bg ">&nbsp;</span>}

            <span className="relative z-10">{day.dayNumber}</span>
           </div>
    )
}