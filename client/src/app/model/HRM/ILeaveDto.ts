
export interface LeaveTypePostDto {


    name: string,
    leaveCategory: string,
    minDate: number,
    maxDate: number,
    incrementValue: number
    createdById: string
}

export interface LeaveTypeGetDto {

    id: string,
    name: string,
    leaveCategory: string,
    minDate: number,
    maxDate: number,
    incrementValue: number

}

export interface LeaveRequestPostDto {

    employeeId: string,
    createdById?: string,
    leaveTypeId: string,
    fromDate: Date,
    totalDate: Number
    reason?:string

}

export interface LeaveBalancePostDto {

    createdById?: string,
    employeeId: string,
    currentBalance: number,
    previousBalance: number,
    previousExpDate: Date,
    leavesTaken: number
}

export interface LeaveBalanceGetDto {
    currentBalance: number,
    previousBalance: number,
    previousExpDate: Date,
    totalBalance: number,
    leavesTaken: number
}
export interface AppliedLeavesGetDto{

    id: string,
    employeeId : string ,
    typeOfLeave: string,
    leaveStatus: string,
    fullName: string,
    leaveDate: Date,
    backToWorkOn: Date,
    remark:string,
    reason:string
}
