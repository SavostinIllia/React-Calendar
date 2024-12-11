import { useToolipContext } from "../../../../context/index";
import { CalendarDayProps } from "../../../../types"
import SvgIcon from "../../../SvgIcon/SvgIcon";

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

  const {showTooltip, hideTooltip} = useToolipContext()

  const onMouseEnterHandler = (e: React.MouseEvent<HTMLDivElement>) => {
  
    const targetElement = e.currentTarget as HTMLElement;
    const calendarElement = targetElement.closest('.calendar') as HTMLElement;
    
    const content = (
      <div className="flex flex-wrap items-center justify-center gap-2">
      <SvgIcon name="info" />
      <p className=" flex-1">
        {eventsListForTheDay && eventsListForTheDay?.length > 0 && (
          <>
            In this day you planned{' '}
            <strong className="text-board-bg">
              {eventsListForTheDay.length} event{eventsListForTheDay.length > 1 ? '\'s' : ''}{' '}
            </strong>. <br />
          </>
        )}
        {holiday && (
          <>
            In this day celebrates <strong className=" text-turquoise">{holiday.name}</strong>.
          </>
        )}  
        </p>
      </div>
    );
    


    if (eventsListForTheDay?.length || holiday) {
      showTooltip(content, targetElement, calendarElement);
    }
  };
  
  
  const onMouseLeaveHandler = () => {
    hideTooltip()
  }

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
                onMouseEnter={onMouseEnterHandler}
                onMouseLeave={onMouseLeaveHandler}
            >
            {HolidayIndicator}
            {EventIndicator}
            <span className="relative z-10">{day.dayNumber}</span>
           </div>
    )
}