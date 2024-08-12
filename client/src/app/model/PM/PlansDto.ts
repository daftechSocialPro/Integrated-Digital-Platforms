import { TaskView } from "./TaskDto"



export interface Plan {

    id?:string
    hasTask: Boolean
    planName: String
    planWeight: Number
    plandBudget: Number   
    remark: String
    structureId: String;
    projectManagerId: String;
    projectNumber:string
    goal:string;
    objective :string 
    startDate : Date 
    endDate :Date 
    projectFunds:string
    createdById ?:string
    


}


export interface PlanView {

    id : string,
    planName: string,
    planWeight: number,
    plandBudget: number,
    remainingBudget: number,
    projectManager: String,
    financeManager: string,
    director: string,
    structureName: String,
    projectType: String,
    numberOfTask: number,
    numberOfActivities: number,
    numberOfTaskCompleted: number,
    hasTask:Number,
    goal:string;
    objective :string 
    startDate : string 
    endDate :string 
    projectNumber:string
    projectFunds:string[]

    projectFundIds:string[]
    projectManagerId:string
    structureId:string


}

export interface PlanSingleview {
    id:string,
    planName:string,
    planWeight:number,
    remainingWeight:number,
    plannedBudget:number,
    remainingBudget:number,
    startDate:Date,
    donor:string,
    projectNumber:string
    endDate:Date
    tasks :TaskView[]

}



export interface PlanPieChartPostDto{

    planName: string
    quarter: string
    chartDataSets: ChartDataSet[]

}

export interface PlanBarChartPostDto{
    planName: string
    progressChartDataSets: ChartDataSet[]
    budgetChartDataSets: ChartDataSet[]
}

export interface ChartDataSet{
    label: string
    data: any
}

export interface StrategicPlanReportDto {
    strategicPlanId: string;
    strategicPlanName?: string;
    actualProgress: number;
    plannedProgress: number;
    actualBudget: number;
    plannedBudget: number;
  }
  









  



