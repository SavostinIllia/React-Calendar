import React from "react";
import { useCalendar } from "../../../utils/hooks/useCalendar";
import { CalendarDay } from "../../index"
import { checkCurrentDate, checkDateEqual, isDateInRange,checkStartRangeDate } from "../../../utils/helpers/date";



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

  return (
    
    <div className="w-3/5 p-40px self-stretch bg-thm-bg">
        <div className="pb-20px" >
          <div aria-hidden className="" onClick={() => functions.calendarStepChangeHandler('prev')}/>
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
          <div aria-hidden className="" onClick={() => functions.calendarStepChangeHandler('next')} />
        </div>
        <div className="flex flex-wrap ">
        {state.mode === 'days' && (
           <>
            <div className="w-full grid grid-rows-1 grid-cols-7 pb-40px text-center gap-15px uppercase text-txt-color font-semibold">
              {state.weekDaysNames.map(weekDaysName => (
                <div className="" key={weekDaysName.dayShort}>{weekDaysName.dayShort}</div>
              ))}
            </div>
            <div className=" calendar w-full grid grid-rows-1 grid-cols-7 text-center gap-15px overflow-hidden">
              {state.calendarDaysRender.map(day => {
                
              const currentDate = checkCurrentDate(day.date);
              const isSelectedDay = checkDateEqual(day.date, state.selectedDate.date);
              const isAdditionalDay = day.monthIndex !== state.selectedMonth.monthIndex;
              const checkInRange = isDateInRange(day.date, state.selectedDateRange.dateStartRange?.date, state.selectedDateRange.endDate?.date );
              const startRangeDate = checkDateEqual(day.date, state.selectedDateRange.dateStartRange?.date )
              const endRangeDate = checkDateEqual(day.date, state.selectedDateRange.endDate?.date )

              return (
              <div  draggable
                    className="date-column w-full flex items-center justify-center relative z-10"
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
                              startRangeDate={startRangeDate}
                              endRangeDate={endRangeDate}
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
          <div className="">
            <div className="">{state.selectedYearRange[0] - 1 }</div>
            {state.selectedYearRange.map((selectedYearItem) => {

              const currentYear = new Date().getFullYear() === selectedYearItem
              const isSelectedYear = state.selectedYear === selectedYearItem

              return (
              <div  className={[
                '',
                currentYear ? '' : ' ',
                isSelectedYear ? '' : ' ',
              ].join(' ')}
                    onClick={() => {
                      functions.setMode('monthes');
                      functions.setSelectedYear(selectedYearItem)
                }}>{selectedYearItem}</div>
            )
            })}
            <div className="">{state.selectedYearRange[state.selectedYearRange.length - 1] + 1 }</div>
          </div>
        )}
        </div>
        <button onClick={() => {
          functions.setEnableHolidaysShow(true)
          functions.fetchFunction.refetch
          }}>
              Show holidays
        </button>
    </div>
  )
  
}
