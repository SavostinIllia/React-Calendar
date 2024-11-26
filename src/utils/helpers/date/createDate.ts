import { CreateDateReturnType } from "../../../types/CreateDateReturnType";
import { getWeekNumber } from "./getWeekNumber";

interface createDateparams {
    locale?: string,
    date? : Date
}


export const createDate = (params? : createDateparams) : CreateDateReturnType => {
      
      const locale = params?.locale ?? 'default';

      const d = params?.date ?? new Date()

      const day = d.toLocaleDateString(locale, {weekday: 'long'}),
              dayShort = d.toLocaleDateString(locale, {weekday: 'short'}),
              dayNumber = d.getDate(),
              dayNumberinWeek = d.getDay() + 1;

      const year = d.getFullYear(),
            yearShort = d.toLocaleDateString(locale, {year: '2-digit'});

      const month = d.toLocaleDateString(locale, {month: 'long'}),
            monthShort = d.toLocaleDateString(locale, {month: 'short'}),
            monthNumber = d.getMonth() + 1,
            monthIndex = d.getMonth();

      const iso = `${year}-${monthNumber <= 9 ? '0' + monthNumber : monthNumber}-${dayNumber < 10 ? '0' + dayNumber : dayNumber}`
     

      const week = getWeekNumber(d)

      const timeStamp = d.getTime()
       
      return{
            date: d, 
            day, dayShort,  dayNumber, dayNumberinWeek, 
            iso,
            year, yearShort,
            month, monthShort,monthNumber,  monthIndex,
            timeStamp,
            week,
      }

}