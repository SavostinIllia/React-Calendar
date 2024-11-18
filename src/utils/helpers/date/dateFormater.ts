import { createDate } from "./createDate"

export const dateFormater = (date: Date, locale:string, format: string, ) => {

    const d = createDate({date, locale})

    return format
        .replace(/\bYYYY\b/, d.year.toString())
        .replace(/\MM\b/, d.month.toString().padStart(2, '0'))
        .replace(/\DD\b/, d.dayNumber.toString().padStart(2, '0'))
}