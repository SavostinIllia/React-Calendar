import React from 'react'
import './static/css/global.css';
import { Calendar } from './components/index'
import { useTheme  } from './context/ThemeContext';
import { CalendarDayTasksContextProvider } from './context/CalendarDayTasksContext';

export const  App: React.FC = () => {
  
  const {theme, toggleTheme} = useTheme();  
  const [selectedDate, selectDate] = React.useState(new Date())
  const currentLocale = navigator.language

  return (
    <CalendarDayTasksContextProvider currentDate={selectedDate}>  
    <>
      <div className={`${theme} bg-thm-gradient main_calendar_wrapper flex justify-center h-screen items-center `}>
        <div className='w-full max-w-screen-lg flex justify-center items-center h-550px shadow-custom rounded-xl overflow-hidden bg-black/[0.1] border-white/50 border-r-white/20 border-b-white/20'>
        <Calendar locale={currentLocale} selectDate={selectDate} selectedDate={selectedDate}/>
        <button onClick={toggleTheme}> lkl</button>
        </div>
      </div>
    </>
    </CalendarDayTasksContextProvider> 
  )
}

export default App
