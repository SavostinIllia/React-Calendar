import { Holiday } from "./Holiday";

export interface CreateDateReturnType{
        date: Date;
        day: string;
        dayShort: string;
        dayNumber: number;
        dayNumberinWeek: number;
        year: number;
        yearShort: string;
        month: string;
        monthShort: string;
        monthNumber: number;
        monthIndex: number;
        timeStamp: number;
        iso: string;
        week: number;
        holiday?: Holiday;
        newTask?: { task: string }[];
}