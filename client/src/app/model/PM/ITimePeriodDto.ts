export interface IReportingPeriodGetDto {
    id:string
    numberOfDays:number
    reportingType:string
}

export interface IReportingPeriodPostDto {
    createdById:string
    numberOfDays:number
    reportingType:string
}

export interface IBudgetYearDto {
    createdById?:string
    status?:string
    budgetYear:number
    id?:String
}