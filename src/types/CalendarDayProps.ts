import { CreateDateReturnType, Holiday, TaskListItem} from "./index";

export interface CalendarDayProps {
    day: CreateDateReturnType;
    currentDate : boolean;
    isSelectedDay: boolean;
    isAdditionalDay: boolean;
    checkInRange: boolean;
    startRangeDate? : boolean;
    endRangeDate? : boolean;
    holiday?: Holiday
    tasksListFortheDay? : TaskListItem[]
}