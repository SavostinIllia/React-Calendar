import { CalendarDayProps } from "../../types"

export const CalendarDay:React.FC<CalendarDayProps> = ({
    day,
    currentDate,
    isSelectedDay,
    isAdditionalDay,
    checkInRange,
    holiday
 }) => {

        return (
            <div 
            className={[
                'calendar__day',
                currentDate ? 'calendar__today__item' : '',
                isSelectedDay ? 'calendar__selected__item' : '',
                isAdditionalDay ? 'calendar__additional__item' : '',
                checkInRange ? 'calendar__selected__item' : '',
                holiday ? 'test' : ''
                ].join(' ')}
            >
            {day?.dayNumber}
           </div>
    )
}