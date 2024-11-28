import { useCalendarDayTasksContext } from '../../../context/CalendarDayTasksContext'


export const CalendarDayTaskSetter = () =>  {

    const {setTaskForSelectedDay} = useCalendarDayTasksContext()
    const onSubmitFormHandler = (e: any) => {
        e.preventDefault()
        setTaskForSelectedDay(e.target[0].value)
        e.target[0].value = ''
    }

  return (
    <>
        <form onSubmit={onSubmitFormHandler}>
        <input type="text" />
        <button className='w-[30px] h-[20px] bg-red'
                type='submit'> submit</button>
        </form>
    </>
  )
}
