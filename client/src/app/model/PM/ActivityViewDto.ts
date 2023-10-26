import { SelectList } from "../common";


export interface ActivityView {

    id: string
    name: string;
    plannedBudget: number;
    activityType: string;
    projectLocation: string;
    projectLocationLat: number;
    projectLocationLng: number;
    activityNumber : string
    begining: number
    target: number
    unitOfMeasurment: string,
    overAllPerformance: Number,
    startDate: string,
    endDate: string,
    members: SelectList[]
    monthPerformance?: MonthPerformanceView[]
    progresscreatedAt?: string
    isFinance: boolean
    isProjectManager: boolean
    isDirector: boolean
    overAllProgress:number


}
export interface MonthPerformanceView {

    id: string;
    order: number,
    monthName: string,
    planned: number,
    actual: number,
    percentage: number
}


export interface ActivityTargetDivisionDto {

    activiyId: string;
    createdBy: string;
    targetDivisionDtos: TargetDivisionDto[]
}
export interface TargetDivisionDto {

    order: number,
    target: number,
    targetBudget: number
}


export interface AddProgressActivityDto {

    ActivityId: string,
    QuarterId: string,
    EmployeeValueId: string,
    ProgressStatus: number,
    ActualBudget: number,
    ActualWorked: number,
    Lat: string,
    lng: string,
    CreatedBy: string,
    Remark: string
}

export interface ViewProgressDto {
    id: string
    actalWorked: number
    usedBudget: number
    documents: string[]
    financeDocument?: string
    remark: string
    isApprovedByManager: string
    isApprovedByFinance: string
    isApprovedByDirector: string
    financeApprovalRemark: string
    managerApprovalRemark: string
    directorApprovalRemark: string
    createdAt: string
    quarterId: string


}

export interface ApprovalProgressDto {

    progressId: string
    userType: string
    actiontype: string
    Remark: string
    createdBy: string

}

