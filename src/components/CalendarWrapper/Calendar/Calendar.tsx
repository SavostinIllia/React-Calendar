import React from "react";
import { useCalendar } from "../../../utils/hooks/useCalendar";
import { CalendarDay, RightBoard } from "../../index";
import { checkCurrentDate, checkDateEqual, isDateInRange } from "../../../utils/helpers/date";
import { useTheme } from "../../../context/ThemeContext";
import { CreateDateReturnType} from "../../../types/index";
import { useCalendarDayTasksContext } from "../../../context/CalendarDayTasksContext";
import SvgIcon from "../../SvgIcon/SvgIcon";


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
    const { theme } = useTheme();

    const {setCurrentDayFromCalendar} = useCalendarDayTasksContext()

    const handlePrevStep = () => functions.calendarStepChangeHandler('prev');
    const handleNextStep = () => functions.calendarStepChangeHandler('next');
    const handleSetMode = (mode: 'days' | 'monthes' | 'years') => functions.setMode(mode);
    
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
        functions.getRangeDaysWithTasks();
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
                        tasksListFortheDay={day.tasksListFortheDay}
                    />
                </div>
            );
        });
    };

    return (
        <>  
            <RightBoard
                selectedDate={state.selectedDate}
                holidayInformation={state.selectedDate?.holiday}
                dateRangeWithHolidays={state.dateRangeWithHolidays}
                selectedDateRange={state.selectedDateRange}        
                test={state.dateGetRange}       
            />
            <div className="w-3/5 m-[40px] mb-3 self-stretch relative">
                <div
                    className={`pb-40px uppercase font-semibold text-center text-3xl flex justify-between w-34 ${theme === 'light' ? 'text-additional-txt-color' : 'text-txt-color'}`}
                >
                    <div
                        aria-hidden
                        className={`arr w-[17px] bg-arrsvg transition hover:cursor-pointer ${theme}`}
                        onClick={handlePrevStep}
                    />
                    {state.mode === 'days' && (
                        <div onClick={() => handleSetMode('monthes')}>
                            {state.monthesNames[state.selectedMonth.monthIndex].month} {state.selectedYear}
                        </div>
                    )}
                    {state.mode === 'monthes' && (
                        <div onClick={() => handleSetMode('years')}>{state.selectedYear}</div>
                    )}
                    {state.mode === 'years' && (
                        <div onClick={() => handleSetMode('days')}>
                            {state.selectedYearRange[0]} - {state.selectedYearRange[state.selectedYearRange.length - 1]}
                        </div>
                    )}
                    <div
                        aria-hidden
                        className={`arr w-[17px] rotate-180 bg-arrsvg transition hover:cursor-pointer ${theme}`}
                        onClick={handleNextStep}
                    />
                </div>
                <div className="flex flex-wrap">
                    {state.mode === 'days' && (
                        <>
                            <div className={`w-full grid grid-cols-7 pb-40px text-center gap-15px uppercase text-txt-color font-semibold ${theme === 'light' ? 'text-additional-txt-color' : 'text-txt-color'}`}>
                                {state.weekDaysNames.map(weekDaysName => (
                                    <div key={weekDaysName.dayShort}>{weekDaysName.dayShort}</div>
                                ))}
                            </div>
                            <div className="calendar w-full grid  grid-cols-7 text-center gap-15px">
                                {renderCalendarDays()}
                            </div>
                        </>
                    )}
                    {state.mode === 'monthes' && (
                        <div className="calendar__pick__items__container">
                            {state.monthesNames.map(monthesName => {
                                const currentMonth = new Date().getMonth() === monthesName.monthIndex && new Date().getFullYear() === state.selectedYear;
                                const isSelectedMonth = monthesName.monthIndex === state.selectedMonth.monthIndex;

                                return (
                                    <div
                                        className={[
                                            'calendar__pick__item',
                                            currentMonth ? 'calendar__today__item' : '',
                                            isSelectedMonth ? 'calendar__selected__item' : ''
                                        ].join(' ')}
                                        key={monthesName.monthShort}
                                        onClick={() => {
                                            functions.setSelectedMonthHandler(monthesName.monthIndex);
                                            functions.setMode('days');
                                        }}
                                    >
                                        {monthesName.monthShort}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                    {state.mode === 'years' && (
                        <div className="">
                            <div>{state.selectedYearRange[0] - 1}</div>
                            {state.selectedYearRange.map((selectedYearItem) => {
                                const currentYear = new Date().getFullYear() === selectedYearItem;
                                const isSelectedYear = state.selectedYear === selectedYearItem;

                                return (
                                    <div
                                        key={selectedYearItem}
                                        className={`${currentYear ? '' : ''} ${isSelectedYear ? '' : ''}`}
                                        onClick={() => {
                                            functions.setMode('monthes');
                                            functions.setSelectedYear(selectedYearItem);
                                        }}
                                    >
                                        {selectedYearItem}
                                    </div>
                                );
                            })}
                            <div>{state.selectedYearRange[state.selectedYearRange.length - 1] + 1}</div>
                        </div>
                    )}
                </div>
                <button className="flex justify-center rounded-md bg-black/10 py-[5px] px-[10px] text-white border-transparent border-r-white/20 border-b-white/20 outline-none w-full mt-6 absolute bottom-0 " 
                        onClick={handleShowHolidays}>
                    {state.isLoading ? <SvgIcon name="spinner" size={24} color="rgba(25, 225, 174, 1)" className=" transition animate-spin" /> : 'Show hollidays'}
                </button>
            </div>
        </>
    );
};
