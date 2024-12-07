import React from "react";
import { createMonth, createDate, getMonthesNames, getWeekDaysNames, getMonthNumberOfDays } from "../helpers/date/index";
import { useHolidayFetchHandler } from "./useHoliday";
import { CreateDateReturnType, Holiday } from "../../types/index";
import { useCalendarDayEventsContext } from "../../context";


interface useCalendarParams {
    locale?: string;
    selectedDate?: Date;
    firstWeekDay?: number
}

const getYearsRange = (year: number) => {
    const startYear = Math.floor(year / 10) * 10
    return [...Array(10)].map((_, i) => startYear + i)
}


export const useCalendar = ({
    locale = 'default',
    selectedDate: date,
    firstWeekDay = 2
}: useCalendarParams) => {
    const {dayWithEvent} = useCalendarDayEventsContext()

    const [mode, setMode] = React.useState<'days' | 'monthes' | 'years'>('days')

    const [selectedDate, setSelectedDate] = React.useState(createDate({locale, date }))

    const [selectedDateRange, setSelectedDayRange] = React.useState<{
        dateStartRange: null | ReturnType<typeof createDate>;
        endDate: null | ReturnType<typeof createDate>;
    }>({dateStartRange: null, endDate: null}) 

    const [calendarDaysRender, setCalendarDayRender] = React.useState<CreateDateReturnType[]>([])
    const [dateGetRange, setDateGetRange] = React.useState<Date[]>([])

    const [dateRangeReverted, setDateRangeReverted] = React.useState(false)
    const [dateRangeWithHolidays, setDateRangeWithHolidays] = React.useState<Holiday[]>([])

    const [selectedMonth, setSelectedMonth] = React.useState(
        createMonth({ date: new Date(selectedDate.year, selectedDate.monthIndex), locale })
    )

    const [selectedYear, setSelectedYear] = React.useState(selectedDate.year)
    const [selectedYearRange, setSelectedYearRange] = React.useState(getYearsRange(selectedYear))
    const [enableHolidaysShow, setEnableHolidaysShow] = React.useState(false)

    const monthesNames = React.useMemo(() => getMonthesNames(locale), [locale])
    const weekDaysNames = React.useMemo(() => getWeekDaysNames(firstWeekDay, locale), [firstWeekDay, locale])

    const days = React.useMemo(() => selectedMonth.createMonthDays(), [selectedMonth, selectedYear])

    const {holidaysState, fetchFunction} = useHolidayFetchHandler({year : selectedYear , month : selectedMonth.monthNumber , country: locale} )

    const calendarDaysToShow = React.useMemo(() => {

        const monthNumberOfDays = getMonthNumberOfDays(selectedMonth.monthIndex, selectedYear);

        const prevMonthDays = createMonth({
            date: new Date(selectedYear, selectedMonth.monthIndex - 1),
            locale
        }).createMonthDays();

        const nextMonthDays = createMonth({
            date: new Date(selectedYear, selectedMonth.monthIndex + 1),
            locale
        }).createMonthDays()

        const firstDay = days[0]
        const lastDay = days[monthNumberOfDays - 1]

        const shiftIndex = firstWeekDay - 1

        const numberofPrevDays = firstDay.dayNumberinWeek - 1 - shiftIndex < 0
            ? 7 - (firstWeekDay - firstDay.dayNumberinWeek)
            : firstDay.dayNumberinWeek - 1 - shiftIndex;

        const numberOfNextMonth = 7 - lastDay.dayNumberinWeek + shiftIndex > 6
            ? 7 - lastDay.dayNumberinWeek - (7 - shiftIndex)
            : 7 - lastDay.dayNumberinWeek + shiftIndex

        const totalCalendarDays = days.length + numberOfNextMonth + numberofPrevDays;

        let calendarResult = []

        for (let i = 0; i < numberofPrevDays; i++) {
            const invert = numberofPrevDays - i
            calendarResult[i] = prevMonthDays[prevMonthDays.length - invert]
        }

        for (let i = numberofPrevDays; i < totalCalendarDays - numberOfNextMonth; i++) {
            calendarResult[i] = days[i - numberofPrevDays]
        }

        for (let i = totalCalendarDays - numberOfNextMonth; i < totalCalendarDays; i++) {
            calendarResult[i] = nextMonthDays[i - totalCalendarDays + numberOfNextMonth]
        }
        

        return calendarResult.map(day => {
            const matchingHoliday = holidaysState.isSuccess && holidaysState.data?.response.holidays.find(holiday => holiday.date.iso.split('T')[0] === day?.iso);
            const matchingEvent = dayWithEvent.find(event => event?.iso === day?.iso);
            return {
                ...day,
                ...(matchingHoliday && { holiday: matchingHoliday }),
                ...(matchingEvent && { eventsListForTheDay: matchingEvent.eventsListForTheDay }),
            };
        }); 


    }, [selectedMonth.year, selectedMonth.monthIndex, selectedYear, holidaysState.data, enableHolidaysShow, dayWithEvent])

    const calendarStepChangeHandler = (direction: 'prev' | 'next') => {

        switch (mode) {
            case 'days':
                const monthIndex = direction === 'prev' ? selectedMonth.monthIndex -1 : selectedMonth.monthIndex + 1;
                
                if(monthIndex === -1){
                    const year = selectedYear - 1
                    setSelectedYear(year)
                    if(!selectedYearRange.includes(year)) 
                        setSelectedYearRange(getYearsRange(year))
                    setSelectedMonth(createMonth({date: new Date( year, 11), locale}))
                }

                if (monthIndex === 12) {
                    const year = selectedYear + 1
                    setSelectedYear(year)
                    if(!selectedYearRange.includes(year)) 
                        setSelectedYearRange(getYearsRange(year))
                    setSelectedMonth(createMonth({date: new Date( year, 0), locale}))
                }

                setSelectedMonth(createMonth({date: new Date( selectedYear, monthIndex), locale}))

                break;
            case 'monthes':
                if(direction === 'next') {
                    const year = selectedYear + 1
                    if(!selectedYearRange.includes(year)) 
                        setSelectedYearRange(getYearsRange(year))
                    return setSelectedYear(year)
                }
                if(direction === 'prev') {
                    const year = selectedYear - 1
                    if(!selectedYearRange.includes(year)) 
                        setSelectedYearRange(getYearsRange(year))
                    return setSelectedYear(year)
                }
                break;
            case 'years': 
                direction === "next" && setSelectedYearRange(getYearsRange(selectedYearRange[0] + 10))
                direction === "prev" && setSelectedYearRange(getYearsRange(selectedYearRange[0] - 10))
                break;
        }
        
    } 

    const setSelectedMonthHandler = React.useCallback(
        (monthIndex: number) => {
            setSelectedMonth(createMonth({ date: new Date(selectedYear, monthIndex), locale }));
        },
        [selectedYear, locale]
    );

    const getRangeDaysWithHoliday = React.useCallback(() => {
        if (holidaysState.isSuccess && holidaysState.data) {
            const daysWithHolidays : Holiday[] = []
            const holidays = holidaysState.data.response.holidays;
            dateGetRange.map(day => {
                const matchingHoliday = holidays.find(holiday => {
                    return holiday.date.iso.split('T')[0] === `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`
                } )   
                matchingHoliday ? daysWithHolidays.push( matchingHoliday ): null

                return daysWithHolidays
            });

             setDateRangeWithHolidays(daysWithHolidays)
        }
    }, [dateGetRange])


    React.useEffect(() => {
        let dateArray = [];
        if (selectedDateRange.dateStartRange && selectedDateRange.endDate) {

           
            let startDate = new Date(selectedDateRange.dateStartRange.date);
            let endDate = new Date(selectedDateRange.endDate.date);

            let earlierDate = startDate < endDate ? startDate : endDate;
            let laterDate = startDate < endDate ? endDate : startDate;

            for (let currentDate = new Date(earlierDate); currentDate <= laterDate; currentDate.setDate(currentDate.getDate() + 1)) {
                dateArray.push(new Date(currentDate));
            }
            
            if (startDate > endDate) {
                setDateRangeReverted(true),
                dateArray.sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
                setDateGetRange(dateArray)
                return
            }else{
                setDateRangeReverted(false),
                setDateGetRange(dateArray)
            }
        }else{
            setDateRangeReverted(false),
            setDateGetRange([])
        }
    }, [selectedDateRange.dateStartRange, selectedDateRange.endDate]);

    React.useEffect(() => {
        setCalendarDayRender(calendarDaysToShow);
    }, [calendarDaysToShow]);

    React.useEffect(() => {
        enableHolidaysShow && fetchFunction.getHolidays();
    }, [selectedMonth, selectedYear, enableHolidaysShow]);

    return {
        state: {
            mode,
            weekDaysNames,
            monthesNames,
            calendarDaysRender,
            selectedDate,
            selectedYear,
            selectedMonth,
            selectedYearRange,
            dateGetRange,
            selectedDateRange,
            dateRangeReverted,
            dateRangeWithHolidays,
            isLoading : holidaysState.isLoading
        },
        functions: {
            setMode,
            setSelectedDate,
            calendarStepChangeHandler,
            setSelectedMonthHandler,
            setSelectedYearRange,
            setSelectedYear,
            setSelectedDayRange,
            setEnableHolidaysShow,
            setDateRangeWithHolidays,
            getRangeDaysWithHoliday,
            fetchFunction,
        }
    }
}