import {  useCalendarDayEventsContext } from "../../../context/index"
import SvgIcon from "../../SvgIcon/SvgIcon"

export const DayEventItem = ({event, day} : any) => {

    const {removeEventFromCurrentDay} = useCalendarDayEventsContext()

    return (
        <> 
            <span className="px-[15px] rounded-g-24px bg-white text-board-bg self-start">{event.time}</span>
            <p className="break-all">{event.event}</p> 
            <button className="ml-auto bg-no-repeat right-[15px] w-[25px] h-[25px] bg-center rounded-md self-center basis-[25px] grow-0 shrink-0 " 
                    onClick={() => removeEventFromCurrentDay(day, event.id)}>
                        <SvgIcon name="trash" size={24} color="rgba(255, 107, 107, 1)"/>
            </button>
        </> 
    )
}