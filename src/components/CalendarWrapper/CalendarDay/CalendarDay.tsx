import { CalendarDayProps } from "../../../types"

export const CalendarDay:React.FC<CalendarDayProps> = ({
    day,
    currentDate,
    isSelectedDay,
    isAdditionalDay,
    checkInRange,
    holiday,
    startRangeDate,
    endRangeDate
 }) => {

        return (
            <div 
            className={[
                'date rounded-full w-[35px] h-[35px] flex items-center justify-center relative text-txt-color font-semibold transition z-10',
                currentDate ? 'cur bg-turquoise' : '',
                isSelectedDay ? 'selec bg-turquoise' : '',
                isAdditionalDay ? 'opacity-5' : '',
                checkInRange ? 'date_in_range bg-turquoise' : '',
                holiday ? '' : '',
                startRangeDate ? "start-range bg-turquoise" : '',
                endRangeDate ? "end-range bg-turquoise overflow-hidden !opacity-100" : '',
                ].join(' ')}
            >
            {day.dayNumber}
           </div>
    )
}