import React from 'react'
import './static/css/global.css';
import { Calendar } from './components/Calendar/Calendar';
import { dateFormater } from './utils/helpers/date';
import { useTheme  } from './context/ThemeContext';



export const  App: React.FC = () => {
  
  const { theme, toggleTheme } = useTheme();  
  const [selectedDate, selectDate] = React.useState(new Date())
  const currentLocale = navigator.language

console.log('teheme', theme)
  
  return (
    <>
      <div className={`${theme} app__container bg-blue-500 text-white p-4 rounded`}>
        <div className='date__container'>
          {dateFormater(selectedDate, currentLocale,  'DD MM YYYY')}
        </div>
        <Calendar locale={currentLocale} selectDate={selectDate} selectedDate={selectedDate}/>
      </div>
      <button onClick={() => toggleTheme()}>dfdf</button>
    </>
  )
}

export default App
