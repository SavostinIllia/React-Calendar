import { createDate } from "../utils/helpers/date"


export interface WeekNamesArray{
    day: ReturnType<typeof createDate>['day']
    dayShort: ReturnType<typeof createDate>['dayShort']
}