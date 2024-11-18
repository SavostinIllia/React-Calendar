import React from 'react'
import './static/css/global.css';
import { Calendar } from './components/Calendar/Calendar';
import { dateFormater } from './utils/helpers/date';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export const  App: React.FC = () => {

const [selectedDate, selectDate] = React.useState(new Date())
const currentLocale = navigator.language

  return (
    <QueryClientProvider client={queryClient}>
    <div className='app__container'>
      <div className='date__container'>
        {dateFormater(selectedDate, currentLocale,  'DD MM YYYY')}
      </div>
      <Calendar locale={currentLocale} selectDate={selectDate} selectedDate={selectedDate}/>
    </div>
    </QueryClientProvider>
  )
}

export default App
