import { createDate } from "./createDate"


interface montheNamesArray { 
    month: ReturnType<typeof createDate>['month'];
    monthShort: ReturnType<typeof createDate>['monthShort'];
    monthIndex: ReturnType<typeof createDate>['monthIndex'];
    date: ReturnType<typeof createDate>['date'];
}

export const getMonthesNames = (locale: string = 'default') => {
    const monthesNames:montheNamesArray[] = Array.from({length: 12})

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