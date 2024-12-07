import { useCalendarDayEventsContext } from '../../../context/index'
import SvgIcon from '../../SvgIcon/SvgIcon'


export const CalendarDayEventSetter = () =>  {

    const {setEventForSelectedDay} = useCalendarDayEventsContext()

    const onSubmitFormHandler = (e: any) => {
      e.preventDefault()
      setEventForSelectedDay(e.target[0].value)
      e.target[0].value = ''
    }

  return (
    <div className='absolute bottom-0 w-full left-0 rounded-t-md z-10'>
        <form className="w-full h-[35px] flex items-center justify-center" onSubmit={onSubmitFormHandler}>
          <input className="w-full h-full rounded-md pr-[40px] bg-black/10 border py-[5px] px-[10px] text-white border-transparent border-r-white/20 border-b-white/20 outline-none" type="text" />
          <button className=' absolute bg-no-repeat right-[5px] w-[25px] h-[25px] bg-center rounded-md' type='submit'>
            &nbsp; 
            <SvgIcon className=" absolute top-0 right-0" name="add" color="rgba(25, 225, 174, 1)" size={32}/>
          </button>
        </form>
    </div>
  )
}
