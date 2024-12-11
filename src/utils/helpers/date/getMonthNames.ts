import { MontheNamesArray } from "../../../types";
import { createDate } from "./createDate"


export const getMonthesNames = (locale: string = 'default') => {
    const monthesNames:MontheNamesArray[] = Array.from({length: 12})

    const d = new Date();

    monthesNames.forEach((_, i) => {
        const {month, monthIndex, monthShort, date } = createDate({
            locale, 
            date: new Date(d.getFullYear(), d.getMonth() + i, d.getDate())
        })

        monthesNames[monthIndex] = {month, monthIndex, monthShort, date}
    })

    return monthesNames
}