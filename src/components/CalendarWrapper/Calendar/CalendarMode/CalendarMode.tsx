import React, { SetStateAction } from "react";
import { TooltipProvider } from "../../../../context";
import { MontheNamesArray, WeekNamesArray } from "../../../../types/index";
import { createMonth } from "../../../../utils/helpers/date";
import SvgIcon from "../../../SvgIcon/SvgIcon";


interface CalendarModeProps {
    mode: "days" | "monthes" | "years";
    weekDaysNames: WeekNamesArray[];
    monthesNames: MontheNamesArray[];
    selectedYear: number;
    selectedMonth: ReturnType<typeof createMonth>;
    selectedYearRange: number[]
    renderCalendarDaysFunc : () => JSX.Element[];
    setModeHandler : React.Dispatch<SetStateAction<"days" | "monthes" | "years">>;
    setMonthHandler: (monthIndex: number) => void;
    setSelectedYearHandler: (year:number) => void;
    handlePrevStep : () => void;
    handleNextStep : () => void;
  
}

export const CalendarMode:React.FC<CalendarModeProps>  = ({
    mode, 
    weekDaysNames, 
    renderCalendarDaysFunc,
    monthesNames, 
    selectedYear, 
    selectedMonth, 
    setModeHandler, 
    setMonthHandler, 
    selectedYearRange, 
    setSelectedYearHandler,
    handlePrevStep,
    handleNextStep
    }) => {


    const renderHeaderTitle = React.useMemo(() => {
        const titles = {
            days: `${monthesNames[selectedMonth.monthIndex].month} ${selectedYear}`,
            monthes: `${selectedYear}`,
            years: `${selectedYearRange[0]} - ${selectedYearRange[selectedYearRange.length - 1]}`,
        };
    
        const nextMode = {
            days: "monthes",
            monthes: "years",
            years: "days",
        } as const;
        
        const calendarHeaderTitle = (
            <div
                className="text-accent-text-color hover:cursor-pointer"
                onClick={() => setModeHandler(nextMode[mode])}
            >
                {titles[mode]}
            </div>
        );
    
        return (
            <header className="pb-40px uppercase font-semibold text-3xl flex justify-between w-full">
                {calendarHeaderTitle}
                <div className="ml-auto flex gap-2">
                    <button
                        aria-label="Go to previous step"
                        className="hover:cursor-pointer"
                        onClick={handlePrevStep}
                    >
                        <SvgIcon name="arrow" size={44} className="text-accent-text-color hover:text-board-bg" />
                    </button>
                    <button
                        aria-label="Go to next step"
                        className="rotate-180 hover:cursor-pointer"
                        onClick={handleNextStep}
                    >
                        <SvgIcon name="arrow" size={44} className="text-accent-text-color" />
                    </button>
                </div>
            </header>
        );
    }, [mode, selectedMonth, selectedYear, selectedYearRange]);
        

    const renderCalendarModeBoard = () => {
        switch (mode) {
            case "days": 
                return (
                    <>
                        <div className={` w-full grid grid-cols-7 items-center mb-[20px] py-[5px] rounded-md text-accent-text-color bg-black/20 text-center gap-15px uppercase font-semibold `}>
                            {weekDaysNames.map(weekDaysName => (
                                <span key={weekDaysName.dayShort}>{weekDaysName.dayShort}</span>
                            ))}
                        </div>
                        <div className="calendar flex-1 py-10 w-full grid  grid-cols-7 text-center gap-15px">
                            <TooltipProvider>
                                {renderCalendarDaysFunc()}
                            </TooltipProvider>
                        </div>
                    </>
                ) ;
            case "monthes":
                return(
                    <div className="w-full flex items-center justify-center h-full ">
                        <div className="w-full grid grid-cols-3 text-center gap-[50px]">
                        {monthesNames.map(monthesName => {
                            const currentMonth = new Date().getMonth() === monthesName.monthIndex && new Date().getFullYear() === selectedYear;
                            const isSelectedMonth = monthesName.monthIndex === selectedMonth.monthIndex;
                            
                            return (
                              
                                <div
                                    className={` flex items-center justify-center rounded-md p-2 bg-black/10 text-white border-transparent border-r-white/20 border-b-white/20  hover:cursor-pointer
                                        ${currentMonth ? ' bg-accent-text-color ' : ''}
                                        ${isSelectedMonth ? '!bg-mint' : ''}`}
                                    key={monthesName.monthShort}
                                    onClick={() => {
                                        setMonthHandler(monthesName.monthIndex);
                                        setModeHandler('days');
                                    }}
                                >
                                  <span className={` font-semibold`}>
                                    {monthesName.month}
                                  </span>
                                </div>
                                
                            );
                        })}
                        </div>
                    </div>
                );
            case "years" : 
                return(
                    <div className="w-full flex items-center justify-center h-full ">
                        <div className="w-full grid grid-cols-3 text-center gap-[50px]">
                            <div className=" flex items-center justify-center rounded-md p-2 bg-black/10 text-white border-transparent border-r-white/20 border-b-white/20 opacity-50 hover:cursor-not-allowed">{
                                selectedYearRange[0] - 1}
                            </div>
                            {selectedYearRange.map((selectedYearItem) => {
                                const currentYear = new Date().getFullYear() === selectedYearItem;
                                const isSelectedYear = selectedYear === selectedYearItem;
                                return (
                                    <div
                                        key={selectedYearItem}
                                        className={` flex items-center justify-center rounded-md p-2 bg-black/10 text-white border-transparent border-r-white/20 border-b-white/20  hover:cursor-pointer
                                            ${currentYear ? ' bg-accent-text-color ' : ''}
                                            ${isSelectedYear ? '!bg-mint' : ''}`}
                                        onClick={() => {
                                            setModeHandler('monthes');
                                            setSelectedYearHandler(selectedYearItem);
                                        }}
                                    >
                                        {selectedYearItem}
                                    </div>
                                );
                            })}
                            <div className=" flex items-center justify-center rounded-md p-2 bg-black/10 text-white border-transparent border-r-white/20 border-b-white/20 opacity-50 hover:cursor-not-allowed">
                                {selectedYearRange[selectedYearRange.length - 1] + 1}
                            </div>
                    </div>
                    </div>
                );
            default: 
                return (<p>Error</p>)
        }
    }

    return (
        <div className="flex h-full flex-col items-start ">
            {renderHeaderTitle}

            {renderCalendarModeBoard()}
        </div>
    )
}