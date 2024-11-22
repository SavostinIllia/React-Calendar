import { CreateDateReturnType, Holiday} from "./index";

export interface CalendarDayProps {
    day: CreateDateReturnType;
    currentDate : boolean;
    isSelectedDay: boolean;
    isAdditionalDay: boolean;
    checkInRange: boolean;
    startRangeDate? : boolean;
    endRangeDate? : boolean;
    holiday?: Holiday
}