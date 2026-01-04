export interface StrategicPlanGetDto {

    id:string
    name:string ,
    description:string,
    strategicPeriodId?: string
    strategicPeriodName?: string
    rowStatus : boolean
}

export interface StrategicPlanPostDto {

    name:string
    description:string
    strategicPeriodId: string
    createdById?:string

}

export interface StrategicPeriodGetDto {
    id: string
    name: string
    description: string
    startDate: Date
    endDate: Date
    rowStatus: boolean
}

export interface StrategicPeriodPostDto {
    name: string
    description: string
    startDate: Date
    createdById?: string
}


export interface UpdateActivityProgressDto
{
    activityId:string
    employeeId:string
    order:number
    actualWorked?:number
    usedBudget?:number
    createdBy:string
    progressType: number
  
}
