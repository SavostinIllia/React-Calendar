import React from "react";
import { useCalendar } from "../../../utils/hooks/useCalendar";
import { CalendarDay, RightBoard } from "../../index";
import { checkCurrentDate, checkDateEqual, isDateInRange } from "../../../utils/helpers/date";
import { CreateDateReturnType} from "../../../types/index";
import SvgIcon from "../../SvgIcon/SvgIcon";
import { useCalendarDayEventsContext } from "../../../context/index";
import { CalendarMode } from "./CalendarMode/CalendarMode";


interface CalendarProps { 
    locale?: string;
    selectedDate: Date;
    selectDate: (date: Date) => void;
    firstWeekDay?: number;
}

export const Calendar: React.FC<CalendarProps> = ({
    locale = 'default',
    firstWeekDay = 2,
    selectedDate,
}) => {
    const { state, functions } = useCalendar({ firstWeekDay, locale, selectedDate });

    const {setCurrentDayFromCalendar} = useCalendarDayEventsContext()

    const handlePrevStep = () => functions.calendarStepChangeHandler('prev');
    const handleNextStep = () => functions.calendarStepChangeHandler('next');

    
    const handleDayClick = (day: CreateDateReturnType) => {
        if (day.monthNumber !== state.selectedMonth.monthNumber) {
            functions.setSelectedMonthHandler(day.monthIndex);
        }
        functions.setSelectedDate(day);
        functions.setDateRangeWithHolidays([]); 
        functions.setSelectedDate(day);
        functions.setSelectedDayRange({ dateStartRange: null, endDate: null });
        setCurrentDayFromCalendar(day)
    };

    const handleDragStart = (day: CreateDateReturnType) => {
        functions.setSelectedDayRange(() => ({ dateStartRange: day, endDate: null }));
        
    };

    const handleDragEnter = (day: CreateDateReturnType) => {
        functions.setSelectedDate(day);
        functions.setSelectedDayRange(prev => ({ ...prev, endDate: day }));
        functions.getRangeDaysWithHoliday();
    };


    const handleShowHolidays = () => {
        functions.setEnableHolidaysShow(true);
        functions.fetchFunction.getHolidays();
    };


    const renderCalendarDays = () => {
        return state.calendarDaysRender.map(day => {
            const currentDate = checkCurrentDate(day.date);
            const isSelectedDay = checkDateEqual(day.date, state.selectedDate.date);
            const isAdditionalDay = day.monthIndex !== state.selectedMonth.monthIndex;
            const checkInRange = isDateInRange(day.date, state.selectedDateRange.dateStartRange?.date, state.selectedDateRange.endDate?.date);
            const startRangeDate = checkDateEqual(day.date, state.selectedDateRange.dateStartRange?.date);
            const endRangeDate = checkDateEqual(day.date, state.selectedDateRange.endDate?.date);

            return (
                <div
                    draggable
                    className={`date-column w-full flex items-center justify-center relative z-10 ${state.dateRangeReverted ? 'reverted' : ''}`}
                    key={`${day.dayNumber}-${day.monthIndex}`}
                    onDragStart={() => handleDragStart(day)}
                    onDragEnter={() => handleDragEnter(day)}
                    onClick={() => handleDayClick(day)}
                >
                    <CalendarDay
                        day={day}
                        currentDate={currentDate}
                        isSelectedDay={isSelectedDay}
                        isAdditionalDay={isAdditionalDay}
                        checkInRange={checkInRange}
                        startRangeDate={startRangeDate}
                        endRangeDate={endRangeDate}
                        holiday={day.holiday}
                        eventsListForTheDay={day.eventsListForTheDay}
                    />
                </div>
            );
        });
    };
    console.log('state.mode', state.mode)

    return (
        <>  
            <RightBoard
                selectedDate={state.selectedDate}
                holidayInformation={state.selectedDate?.holiday}
                dateRangeWithHolidays={state.dateRangeWithHolidays}
                selectedDateRange={state.selectedDateRange}        
                dateGetRange={state.dateGetRange}       
            />
            <div className="w-3/5 py-[50px] mx-3 pt-[20px] self-stretch relative">
                <CalendarMode mode={state.mode} 
                    weekDaysNames={state.weekDaysNames} 
                    monthesNames={state.monthesNames}
                    renderCalendarDaysFunc={renderCalendarDays}
                    selectedYear={state.selectedYear}
                    selectedMonth={state.selectedMonth}
                    setModeHandler={functions.setMode}
                    setMonthHandler={functions.setSelectedMonthHandler}
                    selectedYearRange={state.selectedYearRange}setSelectedYearHandler={functions.setSelectedYear}
                    handleNextStep={handleNextStep}
                    handlePrevStep={handlePrevStep}
                    />
                {state.mode === 'days' && 
                    <button className="flex justify-center rounded-md bg-black/10 text-txt-color border-transparent border-r-white/20 border-b-white/20 outline-none w-full absolute bottom-3 py-[5px] " 
                            onClick={handleShowHolidays}>
                        {state.isLoading ? <SvgIcon name="spinner" size={24} color="rgba(25, 225, 174, 1)" className=" transition animate-spin" /> : 'Show hollidays'}
                    </button>
                }
            </div>
        </>
    );
};
