export interface Holiday {
    name: string;
    description: string;
    country: {
        id: string;
        name: string;
    };
    date: {
        iso: string;
        datetime: {
            year: number;
            month: number;
            day: number;
        };
    };
    type: string[];
    primary_type: string;
    canonical_url: string;
    urlid: string;
    locations: string;
    states: string;
}