export interface HolidayListDto {
    id: string;
    holidayDate: Date;
    holidayName: string;
}

export interface AddHolidayDto {
    id?: string;
    createdById: string;
    holidayDate: Date;
    holidayName: string;
}
