export interface ShiftListDto {
    id?: string
    createdById?: string;
    shiftName: string;
    amharicShiftName: string;
    checkIn: any;
    checkOut: any;
    shiftDetails?: ShiftDetailDto[];

}


export interface ShiftDetailDto {
    id: string;
    weekDays: string;
    breakTime: number;
}


export interface AddShiftDetail {
    shiftId: string;
    createdById: string;
    weekDays: string;
    breakTime: number;
}

export interface BindShiftDto {
    createdById: string;
    shiftId: string;
    employeeId: string;
}

