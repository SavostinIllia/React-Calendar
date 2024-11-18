import { useQuery } from "@tanstack/react-query";
import { Holiday } from "../../../types";


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
    const { data, isLoading, error, isSuccess } = useQuery({
        queryKey: ['holidays', year, month, country],
        queryFn: async (): Promise<HolidayFetchResponse> => {
            const result = await fetch(
                `${holidayApiUrl}?&api_key=${holidayApiKey}&country=${country?.split('-')[1]}&year=${year}&month=${month}`
            );
            if (!result.ok) {
                throw new Error('Failed to fetch holidays');
            }
            return await result.json();
        },
        refetchOnWindowFocus: false, 
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
    };
};