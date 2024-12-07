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
    eventsListForTheDay,

 }) => {

    const HolidayIndicator = holiday && (
        <span className="day__holiday absolute rounded-md w-[7px] h-[7px] center-x bottom-[12px] bg-turquoise shadow-xxs" />
      );
      
      const EventIndicator = eventsListForTheDay && (
        <span className="day__event absolute rounded-md w-[7px] h-[7px] center-x bottom-[3px] bg-board-bg shadow-xxs" />
      );

        return (
            <div className={[
                'date p-30 rounded-full w-[60px] h-[60px] flex items-center justify-center text-txt-color font-semibold transition z-10 hover:cursor-pointer relative ',
                currentDate ? 'current_day bg-current-day !bg-opacity-50 text-white' : '',
                isSelectedDay ? 'is__selected bg-mint text-white' : '',
                isAdditionalDay ? 'opacity-40' : '',
                checkInRange ? 'date_in_range !opacity-100 text-white' : '',
                holiday ? '' : '',
                startRangeDate ? "start_range" : '',
                endRangeDate ? "end_range overflow-hidden !opacity-100" : '',
                eventsListForTheDay ? 'day__with_event ' : '',
                ].join(' ')}
                // TODO TOOLTIP HOVER
            >
            {HolidayIndicator}
            {EventIndicator}
            <span className="relative z-10">{day.dayNumber}</span>
           </div>
    )
}