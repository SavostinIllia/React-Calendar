import React from "react";
import { useCalendar } from "./hooks/useCalendar";
import './Calendar.css';
import { CalendarDay } from "./CalendarDay";
import { checkCurrentDate, checkDateEqual, isDateInRange } from "../../utils/helpers/date";


interface CalendarProps { 
    locale?: string;
    selectedDate: Date;
    selectDate: (date: Date) => void;
    firstWeekDay?: number
}


export const Calendar: React.FC<CalendarProps> = ({
    locale = 'default',
    firstWeekDay = 2,
    selectedDate,
   }) => {
    
  const {state, functions} = useCalendar({firstWeekDay, locale, selectedDate})
console.log('state', state)
  return (
    
    <div className="calendar">
        <div className="calendar__header" >
          <div aria-hidden className="calendar__header__arrow__left" onClick={() => functions.calendarStepChangeHandler('prev')}/>
            {state.mode === 'days' && (
              <div onClick={() => functions.setMode('monthes')}>
                {!state.dateGetRange.length 
                ? state.selectedDate.dayNumber
                :`${state.dateGetRange[0].getDate()} - ${state.dateGetRange[state.dateGetRange.length - 1].getDate()}`} {state.monthesNames[state.selectedMonth.monthIndex].month} {state.selectedYear}
                
              </div>
            )}
            {state.mode === 'monthes' && (
              <div onClick={() => functions.setMode('years')}>
                {state.selectedYear} 
              </div>
            )}
            {state.mode === 'years' && (
              <div onClick={() => functions.setMode('days')}>
                {state.selectedYearRange[0]} -{' '}
                {state.selectedYearRange[state.selectedYearRange.length  -1 ]}
              </div>
            )}
          <div aria-hidden className="calendar__header__arrow__right" onClick={() => functions.calendarStepChangeHandler('next')} />
        </div>
        <div className="calendar__body">
        {state.mode === 'days' && (
           <>
            <div className="calendar__week__names">
              {state.weekDaysNames.map(weekDaysName => (
                <div key={weekDaysName.dayShort}>{weekDaysName.dayShort}</div>
              ))}
            </div>
            <div className="calendar__days">
              {state.calendarDaysRender.map(day => {
                
              const currentDate = checkCurrentDate(day.date);
              const isSelectedDay = checkDateEqual(day.date, state.selectedDate.date);
              const isAdditionalDay = day.monthIndex !== state.selectedMonth.monthIndex;
              const checkInRange = isDateInRange(day.date, state.selectedDateRange.dateStartRange, state.selectedDateRange.endDate );

              return (
              <div  draggable
                    key={`${day.dayNumber}-${day.monthIndex}`}
                    onDragStart={() => {
                      functions.setSelectedDayRange(() => ({ dateStartRange: day, endDate: null}))
                    }}
                    onDragEnter={ () => {
                      functions.setSelectedDate(day)
                      functions.setSelectedDayRange(prev => ({...prev , endDate: day}))
                    }
                    }
                    onClick={() => {
                      if(day.monthNumber !== state.selectedMonth.monthNumber){
                        functions.setSelectedMonthHandler(day.monthIndex)
                      }
                      functions.setSelectedDate(day)
                      functions.setSelectedDayRange({dateStartRange:null, endDate: null})
                    }}
                >
                <CalendarDay  day={day} 
                              currentDate={currentDate} 
                              isSelectedDay={isSelectedDay}
                              isAdditionalDay={isAdditionalDay} 
                              checkInRange={checkInRange}   
                              holiday={day.holiday}
                             />
                </div>
              )
                 
              })}
            </div>
           </> 
        )}
        {state.mode === 'monthes' && (
          <div className="calendar__pick__items__container">
            {state.monthesNames.map(monthesName => {

              const currentMonth = 
                    new Date().getMonth() === monthesName.monthIndex &&
                    new Date().getFullYear() === state.selectedYear;
              const isSelectedMonth = monthesName.monthIndex === state.selectedMonth.monthIndex

              return <div className={[
                  'calendar__pick__item',
                  currentMonth ? 'calendar__today__item' : '',
                  isSelectedMonth ? 'calendar__selected__item' : ''
                  ].join(' ')}
                  key={monthesName.monthShort}
                  onClick={() => {
                    functions.setSelectedMonthHandler(monthesName.monthIndex)
                    functions.setMode('days')
                  }}
                  >
                  {monthesName.monthShort}</div>
              
            })}
          </div>
        ) }
        {state.mode === 'years' && (
          <div className="calendar__pick__items__container">
            <div className="calendar__unchoosable__year">{state.selectedYearRange[0] - 1 }</div>
            {state.selectedYearRange.map((selectedYearItem) => {

              const currentYear = new Date().getFullYear() === selectedYearItem
              const isSelectedYear = state.selectedYear === selectedYearItem

              return (
              <div  className={[
                'calendar__pick__item',
                currentYear ? 'calendar__today__item' : ' ',
                isSelectedYear ? 'calendar__selected__item' : ' ',
              ].join(' ')}
                    onClick={() => {
                      functions.setMode('monthes');
                      functions.setSelectedYear(selectedYearItem)
                }}>{selectedYearItem}</div>
            )
            })}
            <div className="calendar__unchoosable__year">{state.selectedYearRange[state.selectedYearRange.length - 1] + 1 }</div>
          </div>
        )}
        </div>
    </div>
  )
}
