import { useCalendarDayTasksContext } from "../../../context"
import SvgIcon from "../../SvgIcon/SvgIcon"

export const TaskItem = ({task, day} : any) => {

    const {removeTaskFromCurrentDay} = useCalendarDayTasksContext()

    return (
        <> 
            <span className="px-[15px] rounded-g-24px bg-white text-board-bg self-start">{task.time}</span>
            <p className="break-all">{task.task}</p> 
            <button className="ml-auto bg-no-repeat right-[15px] w-[25px] h-[25px] bg-center rounded-md self-center basis-[25px] grow-0 shrink-0 " 
                    onClick={() => removeTaskFromCurrentDay(day, task.id)}>
                        <SvgIcon name="trash" size={24} color="rgba(255, 107, 107, 1)"/>
            </button>
        </> 
    )
}