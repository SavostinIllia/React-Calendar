import React from 'react'
import './static/css/global.css';
import { Calendar } from './components/index'
// import { useThemeContext  } from './context/ThemeContext';
import { CalendarDayEventsContextProvider } from './context/CalendarDayEventsContext';

export const  App: React.FC = () => {
  
  // const {toggleTheme} = useThemeContext();  
  const [selectedDate, selectDate] = React.useState(new Date())
  const currentLocale = navigator.language

  return (
    <CalendarDayEventsContextProvider >  
    <>
      <div className={`bg-thm-gradient main_calendar_wrapper flex justify-center h-screen items-center `}>
        <div className='w-full max-w-screen-lg flex justify-center items-center h-700px shadow-custom rounded-xl overflow-hidden bg-black/[0.1] border-white/50 border-r-white/20 border-b-white/20'>
        <Calendar locale={currentLocale} selectDate={selectDate} selectedDate={selectedDate}/>
        {/* <button onClick={toggleTheme}></button> */}
        </div>
      </div>
    </>
    </CalendarDayEventsContextProvider> 
  )
}

export default App
