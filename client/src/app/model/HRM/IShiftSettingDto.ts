export interface ShiftListDto {
    id?: string
    createdById?: string;
    shiftName: string;
    amharicShiftName: string;
    checkIn: any;
    checkOut: any;
    breakTime: number;
}


export interface BindShiftDto {
    createdById: string;
    shiftId: string;
    employeeId: string;
}

