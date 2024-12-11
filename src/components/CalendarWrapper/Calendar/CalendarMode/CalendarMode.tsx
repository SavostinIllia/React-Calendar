import { SetStateAction } from "react";
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

    const renderHeaderTitle = () => {
        switch (mode) {
            case 'days':
            return `${monthesNames[selectedMonth.monthIndex].month} ${selectedYear}`;
            case 'monthes':
            return selectedYear;
            case 'years':
            return `${selectedYearRange[0]} - ${selectedYearRange[selectedYearRange.length - 1]}`;
            default:
            return '';
        }
    };

    const renderCalendarModeBoard = () => {
        switch (mode) {
            case "days": 
                return (
                    <>
                        <div className={`w-full grid grid-cols-7 mb-[30px] py-[10px] rounded-md text-accent-text-color bg-black/20 text-center gap-15px uppercase font-semibold `}>
                            {weekDaysNames.map(weekDaysName => (
                                <span key={weekDaysName.dayShort}>{weekDaysName.dayShort}</span>
                            ))}
                        </div>
                        <div className="calendar w-full grid  grid-cols-7 text-center gap-15px">
                            <TooltipProvider>
                                {renderCalendarDaysFunc()}
                            </TooltipProvider>
                        </div>
                    </>
                ) ;
            case "monthes":
                return(
                    <div className="w-full grid  grid-cols-3 text-center gap-15px">
                        {monthesNames.map(monthesName => {
                            const currentMonth = new Date().getMonth() === monthesName.monthIndex && new Date().getFullYear() === selectedYear;
                            const isSelectedMonth = monthesName.monthIndex === selectedMonth.monthIndex;

                            return (
                                <div
                                    className={[
                                        'calendar__pick__item',
                                        currentMonth ? 'calendar__today__item' : '',
                                        isSelectedMonth ? 'calendar__selected__item' : ''
                                    ].join(' ')}
                                    key={monthesName.monthShort}
                                    onClick={() => {
                                        setMonthHandler(monthesName.monthIndex);
                                        setModeHandler('days');
                                    }}
                                >
                                    {monthesName.monthShort}
                                </div>
                            );
                        })}
                    </div>
                );
            case "years" : 
                return(
                    <div className="">
                        <div>{selectedYearRange[0] - 1}</div>
                        {selectedYearRange.map((selectedYearItem) => {
                            const currentYear = new Date().getFullYear() === selectedYearItem;
                            const isSelectedYear = selectedYear === selectedYearItem;

                            return (
                                <div
                                    key={selectedYearItem}
                                    className={`${currentYear ? '' : ''} ${isSelectedYear ? '' : ''}`}
                                    onClick={() => {
                                        setModeHandler('monthes');
                                        setSelectedYearHandler(selectedYearItem);
                                    }}
                                >
                                    {selectedYearItem}
                                </div>
                            );
                        })}
                        <div>{selectedYearRange[selectedYearRange.length - 1] + 1}</div>
                    </div>
                );
            default: 
                return (<p>Error</p>)
        }
    }

    return (
        <div className="flex flex-wrap h-full">
            <header className={`pb-40px uppercase font-semibold text-3xl flex justify-between w-full `} >
                {mode === 'days' && (
                    <div className="text-accent-text-color hover:cursor-pointer" onClick={() => setModeHandler('monthes')}>{renderHeaderTitle()}</div>
                )}
                {mode === 'monthes' && (
                    <div className="text-accent-text-color hover:cursor-pointer" onClick={() => setModeHandler('years')}>{renderHeaderTitle()}</div>
                )}
                {mode === 'years' && (
                    <div className="text-accent-text-color hover:cursor-pointer" onClick={() => setModeHandler('days')}>{renderHeaderTitle()}</div>
                )}

                <div className=" ml-auto flex gap-2">
                    <button
                        aria-hidden
                        className={`hover:cursor-pointer`}
                        onClick={handlePrevStep}>
                            <SvgIcon name="arrow" size={44} className=" text-accent-text-color hover:text-board-bg" />
                    </button>
                    <button
                        aria-hidden
                        className={`rotate-180 hover:cursor-pointer `}
                        onClick={handleNextStep}>
                            <SvgIcon name="arrow" size={44} className=" text-accent-text-color hover:" />
                    </button>
                </div>
            </header>

            {renderCalendarModeBoard()}

        </div>
    )
}