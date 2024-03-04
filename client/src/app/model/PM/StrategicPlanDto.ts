export interface StrategicPlanGetDto {

    id:string
    name:string ,
    description:string
}

export interface StrategicPlanPostDto {

    name:string
    description:string
    createdById?:string

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
