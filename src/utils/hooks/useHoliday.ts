import { useQuery } from "@tanstack/react-query";
import { Holiday } from "../../types/index";


const holidayApiKey = import.meta.env.VITE_CALENDARIFIC_KEY;
const holidayApiUrl = 'https://calendarific.com/api/v2/holidays'

interface HolidayFetchHandlerParams {
    year : number;
    month: number;
    country?: string | 'dafault'

}

interface HolidayFetchResponse {
    meta: {
        code: number;
    };
    response: {
        holidays: Holiday[];
    };
}


export const useHolidayFetchHandler = ({ year, month, country }: HolidayFetchHandlerParams) => {

    const fetchHolidays = async (): Promise<HolidayFetchResponse> => {
       
        const response = await fetch('rer');
        // `${holidayApiUrl}?&api_key=${holidayApiKey}&country=${country?.split('-')[1]}&year=${year}&month=${month}`

        if (!response.ok) {
            throw new Error(`Failed to fetch holidays: ${response.statusText}`);
        }
        const data = await response.json();
    
        // Переконуємося, що функція повертає завжди правильний тип
        if (!data || !data.response || !data.response.holidays) {
            throw new Error("Invalid holiday data received from API");
        }
    
        return data;
    };

    const { data, isLoading, error, isSuccess, refetch } = useQuery({
        queryKey: ['holidays', year, month, country],
        queryFn: fetchHolidays,
        refetchOnWindowFocus: false, 
        enabled: false,
        refetchOnMount: false, 
        refetchOnReconnect: false, 
    });


    
    return {
        holidaysState: {
            data: isSuccess ? data : null,
            isLoading,
            error: error ? error : null,
            isSuccess,
        },
        fetchFunction: {
            refetch
        }
    };
};