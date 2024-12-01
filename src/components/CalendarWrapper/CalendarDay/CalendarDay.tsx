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
                'date p-[20px] rounded-full w-[35px] h-[35px] flex items-center justify-center relative text-txt-color font-semibold transition z-10 hover:cursor-pointer ',
                currentDate ? '' : '',
                isSelectedDay ? 'is__selected' : '',
                isAdditionalDay ? 'opacity-5' : '',
                checkInRange ? 'date_in_range !opacity-100 text-white' : '',
                holiday ? '' : '',
                startRangeDate ? "start_range" : '',
                endRangeDate ? "end_range overflow-hidden !opacity-100" : '',
                tasksListFortheDay ? 'day__with_task' : '',
                ].join(' ')}
            >
            {holiday && <span> hiloday</span>}
            <span className="relative z-10">{day.dayNumber}</span>
           </div>
    )
}