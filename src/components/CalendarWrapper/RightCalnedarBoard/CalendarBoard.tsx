import React from "react";
import { CreateDateReturnType, Holiday } from "../../../types";
import { CalendarDayTaskSetter } from "./CalendarDayTaskSetter";
import { useCalendarDayTasksContext } from "../../../context";
import { TaskItem } from "./TaskItem";
import { createDate } from "../../../utils/helpers/date";

interface RightBoardCalendarProps {
    selectedDate: CreateDateReturnType;
    holidayInformation?: Holiday;
    dateRangeWithHolidays?: Holiday[] | undefined;
    dateRangeWithTasks?: CreateDateReturnType[] | undefined;
    selectedDateRange: {
        dateStartRange: ReturnType<typeof createDate> | null;
        endDate: ReturnType<typeof createDate> | null;
    };
    test: Date[]; // Типізовано тестовий масив
}

export const RightBoard = ({
    selectedDate,
    holidayInformation,
    dateRangeWithHolidays,
    selectedDateRange,
    test,
}: RightBoardCalendarProps) => {
    const { dayWithTask } = useCalendarDayTasksContext();

    // Вираховуємо завдання у діапазоні дат
    const tasksInDateRange = React.useMemo(() => {
        if (
            !dayWithTask ||
            dayWithTask.length === 0 ||
            !selectedDateRange.dateStartRange ||
            !selectedDateRange.endDate ||
            test.length === 0
        ) {
            return [];
        }

        return test.reduce<CreateDateReturnType[]>((acc, day) => {
            const matchingTask = dayWithTask.find(
                (task) =>
                    `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, "0")}-${String(
                        day.getDate()
                    ).padStart(2, "0")}` === task.iso
            );
            if (matchingTask) {
                acc.push(matchingTask);
            }
            return acc;
        }, []);
    }, [test, selectedDateRange, dayWithTask]);

    // Рендеринг свят у діапазоні
    const holidaysInDateRange = React.useMemo(() => {
        if (!dateRangeWithHolidays?.length) return null;

        return (
            <>
                <h3 className="holliday__text text-violet text-4xl mb-4">Holiday this day's</h3>
                <ul>
                    {dateRangeWithHolidays.map((holiday) => (
                        <li
                            key={holiday.date.iso}
                            className="bg-black/[0.1] rounded-lg py-[5px] px-[10px] mb-4 text-xl text-txt-color"
                        >
                            {holiday.date.iso.split("T")[0]}: {holiday.name}
                        </li>
                    ))}
                </ul>
            </>
        );
    }, [dateRangeWithHolidays]);

    // Рендеринг завдань на обраний день
    const renderDayTasks = React.useMemo(() => {
        const todayTasks = dayWithTask.find((day) => day.iso === selectedDate.iso);
        if (!todayTasks?.tasksListFortheDay?.length) return null;

        return (
            <div
                className={`task__wrapper relative h-full ${
                    holidayInformation ? "max-h-[330px]" : "max-h-[440px]"
                } overflow-y-auto pr-2`}
            >
                <h3 className="taskslist__text text-turquoise text-4xl mb-2 pb-3">
                    Tasks for Today
                </h3>
                {todayTasks.tasksListFortheDay.map((task) => (
                    <TaskItem key={task.id} task={task} day={todayTasks} />
                ))}
            </div>
        );
    }, [dayWithTask, selectedDate, holidayInformation]);

    // Рендеринг завдань у діапазоні
    const renderTasksInDateRange = React.useMemo(() => {
        if (!tasksInDateRange.length) return null;

        return (
            <div>
                {tasksInDateRange.map((day) => (
                    <div key={day.iso}>
                        <p>{day.iso}</p>
                        <div>
                            {day.tasksListFortheDay?.map((task) => (
                                <TaskItem key={task.id} task={task} day={day} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    }, [tasksInDateRange]);

    return (
        <div className="w-2/5 self-stretch p-20px relative overflow-hidden">
            <div className="text-center text-txt-color mb-4">
                {selectedDateRange.dateStartRange && selectedDateRange.endDate ? (
                    <div className="flex justify-center items-center gap-4">
                        <h1 className="text-[60px] leading-none">
                            {selectedDateRange.dateStartRange.dayNumber}{" "}
                            {selectedDateRange.dateStartRange.dayShort}
                            <p className="text-base leading-none">
                                {selectedDateRange.dateStartRange.monthShort}
                            </p>
                        </h1>
                        <span className="text-[60px]">-</span>
                        <h1 className="text-[60px] leading-none">
                            {selectedDateRange.endDate.dayNumber}{" "}
                            {selectedDateRange.endDate.dayShort}
                            <p className="text-xl leading-none">
                                {selectedDateRange.endDate.monthShort}
                            </p>
                        </h1>
                    </div>
                ) : (
                    <>
                        <h1 className="text-[130px] leading-none">{selectedDate.dayNumber}</h1>
                        <h2 className="text-3xl">{selectedDate.day}</h2>
                    </>
                )}
            </div>

            {holidaysInDateRange ||
                (holidayInformation?.name && (
                    <div className="text-txt-color mb-5">
                        <h3 className="holliday__text text-violet text-4xl mb-4">Holiday this day</h3>
                        <p className="bg-black/[0.1] rounded-lg py-[5px] px-[10px] text-xl">
                            {holidayInformation.name}
                        </p>
                    </div>
                ))}

            {renderTasksInDateRange || renderDayTasks}

            {!selectedDateRange.dateStartRange && !selectedDateRange.endDate && (
                <CalendarDayTaskSetter />
            )}
        </div>
    );
};
