import { createDate } from "./createDate";
import { getMonthNumberOfDays } from "./getMonthNumberOfDays";

interface createMonthparams {
    date?: Date;
    locale?: string
}

export const createMonth = (params? : createMonthparams) => {

    const date = params?.date ?? new Date();
    const locale = params?.locale ?? 'en';

    const d = createDate({date, locale})

    const {month: monthName, year, monthNumber, monthIndex } = d

    const getDay = (dayNumber: number) => {
        return createDate({date: new Date(year, monthIndex, dayNumber), locale})
    }

    const createMonthDays = () => {
        const days = [];

        for(let i = 0; i <= getMonthNumberOfDays(monthIndex, year) - 1; i ++){
                days[i] = getDay(i + 1)
        }

        return days
    }

    return {
        getDay, 
        monthName, monthIndex, monthNumber, createMonthDays,
        year
    }
}