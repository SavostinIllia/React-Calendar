import React from 'react'
import './static/css/global.css';
import { Calendar, RightBoard } from './components/index'
import { dateFormater } from './utils/helpers/date';
import { useTheme  } from './context/ThemeContext';



export const  App: React.FC = () => {
  
  const {theme, toggleTheme } = useTheme();  
  const [selectedDate, selectDate] = React.useState(new Date())
  const currentLocale = navigator.language
  
  return (  
    <>
      <div className={`${theme} main_calendar_wrapper flex justify-center h-screen items-center `}>
        <div className='w-full max-w-screen-lg flex justify-center items-center h-550px shadow-custom rounded-xl'>
        {/* <div className='date__container '>
          {dateFormater(selectedDate, currentLocale,  'DD MM YYYY')}
        </div> */}
        <RightBoard />
        <Calendar locale={currentLocale} selectDate={selectDate} selectedDate={selectedDate}/>
        </div>
      </div>
      
    </>
  )
}

export default App
