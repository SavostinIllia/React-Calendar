export const checkCurrentDate = (date: Date) => {
    const currentDate = new Date()
    
    return checkDateEqual(currentDate, date)

}

export const checkDateEqual = (date1:Date, date2: Date) => {

   return date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate();
}

export const isDateInRange = (date: Date, startDate, endDate) => {
    if (!startDate || !endDate) return false;
    
    const start = new Date(Math.min(new Date(startDate.date).getTime(), new Date(endDate.date).getTime()));
    const end = new Date(Math.max(new Date(startDate.date).getTime(), new Date(endDate.date).getTime()));
    return date.getTime() >= start.getTime() && date.getTime() <= end.getTime();
};