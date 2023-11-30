
export interface LeaveTypePostDto {


    name: string,
    amharicName: string;
    leaveCategory: string,
    minDate: number,
    maxDate: number,
    incrementValue: number
    createdById: string
}

export interface LeaveTypeGetDto {

    id: string,
    name: string,
    amharicName: string;
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
    reason?: string

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
export interface AppliedLeavesGetDto {

    id: string,
    employeeId: string,
    typeOfLeave: string,
    leaveStatus: string,
    fullName: string,
    leaveDate: Date,
    backToWorkOn: Date,
    remark: string,
    reason: string
}


export interface LeavePlanSettingGetDto {
    id: string
    employeeId: string,
    toDate: Date,
    fromDate: Date,
    leavePlanSettingStatus: string
    rejectedremark?: string
    employeeName:string
    department:string


}

export interface LeavePlanSettingUpdateDto {
    id: string,
    leavePlanSettingStatus?: string,
    rejectedremark?: string
}
export interface LeavePlanSettingPostDto {

    id?: String,
    toDate: Date,
    fromDate: Date,
    leavePlanSettingStatus?: string
    rejectedremark?: string
    createdById?: string
    employeeId:string
}


