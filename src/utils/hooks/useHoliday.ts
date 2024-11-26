import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Holiday } from "../../types/index";

const holidayApiKey = import.meta.env.VITE_CALENDARIFIC_KEY;
const holidayApiUrl = "https://calendarific.com/api/v2/holidays";

interface HolidayFetchHandlerParams {
  year: number;
  month: number;
  country?: string | "default";
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
  const queryClient = useQueryClient();

  const fetchHolidays = async (): Promise<HolidayFetchResponse> => {
    const response = await fetch(
          `${holidayApiUrl}?&api_key=${holidayApiKey}&country=${country?.split("-")[1]}&year=${year}&month=${month}`
    );



    if (!response.ok) {
      throw new Error(`Failed to fetch holidays: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data || !data.response || !data.response.holidays) {
      throw new Error("Invalid holiday data received from API");
    }

    return data;
  };

  const { data, isLoading, error, isSuccess, refetch, } = useQuery({
    queryKey: ["holidays", year, month, country],
    queryFn: fetchHolidays,
    refetchOnWindowFocus: false,
    enabled: false, 
  });


  const getHolidays = async () => {
    const cachedData = queryClient.getQueryData<HolidayFetchResponse>(["holidays", year, month, country]);

    if (cachedData) {
      return cachedData; 
    }

    const result = await refetch();
    if (result.data) {
      return result.data; 
    }

    throw new Error("Failed to fetch holidays");
  };

  return {
    holidaysState: {
      data: isSuccess ? data : null,
      isLoading,
      error: error ? error : null,
      isSuccess,
      
    },
    fetchFunction: {
      getHolidays, 
    },
  };
};
