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
    reverted
 }) => {

        return (
            <div 
            className={[
                'date rounded-full w-[35px] h-[35px] flex items-center justify-center relative text-txt-color font-semibold transition z-10 hover:cursor-pointer',
                currentDate ? 'bg-currentDay ' : '',
                isSelectedDay ? 'bg-turquoise' : '',
                isAdditionalDay ? 'opacity-5' : '',
                checkInRange ? 'date_in_range !opacity-100 text-white' : '',
                holiday ? '' : '',
                startRangeDate ? "start_range" : '',
                endRangeDate ? "end_range !bg-turquoise overflow-hidden !opacity-100" : '',
                ].join(' ')}
            >
            <span className="relative z-10">{day.dayNumber}</span>
           </div>
    )
}