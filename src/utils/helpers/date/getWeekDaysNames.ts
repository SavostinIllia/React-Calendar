import { WeekNamesArray } from "../../../types/WeekDaysNames";
import { createDate } from "./createDate"




export const getWeekDaysNames = (firstWeekDay : number, locale: string = 'default') => {
    const weekDaysNames : WeekNamesArray[] = Array.from({length: 7})

    const date = new Date();

    weekDaysNames.forEach((_, i) => {
        const {day, dayNumberinWeek, dayShort} = createDate({
            locale, 
            date: new Date(date.getFullYear(), date.getMonth(), date.getDate() + i)
        });

        weekDaysNames[dayNumberinWeek - 1 ] = {day, dayShort}
    })

    return [...weekDaysNames.slice(firstWeekDay - 1), ...weekDaysNames.slice(0, firstWeekDay - 1)]
} 