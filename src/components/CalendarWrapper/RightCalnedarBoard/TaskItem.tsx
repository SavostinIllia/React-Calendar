import { useCalendarDayTasksContext } from "../../../context"

export const TaskItem = ({task, day} : any) => {

    const {removeTaskFromCurrentDay} = useCalendarDayTasksContext()

    return (
        <div className="task__item flex basis-full text-txt-color w-full justify-start gap-[10px] mb-5 py-[5px] px-[10px] bg-black/[0.1] rounded-lg z-10 last-of-type:mb-0"> 
            <span className="px-[15px] rounded-g-24px bg-white text-board-bg self-start">{task.time}</span>
            <p className="break-all">{task.task}</p> 
            <button className="bg-trashsvg ml-auto bg-no-repeat right-[15px] w-[25px] h-[25px] bg-center rounded-md self-center basis-[25px] grow-0 shrink-0 " 
                    onClick={() => removeTaskFromCurrentDay(day, task.id)}>&nbsp;</button>
        </div> 
    )
}