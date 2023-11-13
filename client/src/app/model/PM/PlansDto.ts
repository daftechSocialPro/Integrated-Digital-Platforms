import { TaskView } from "./TaskDto"



export interface Plan {

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
    startDate : number 
    endDate :number 
    projectFunds:string
    createdById ?:string
    


}


export interface PlanView {

    id : string,
    planName: String,
    planWeight: Number,
    plandBudget: Number,
    remainingBudget: Number,
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
    projectFunds:string


}

export interface PlanSingleview {
    id:String,
    planName:String,
    planWeight:number,
    remainingWeight:number,
    plannedBudget:number,
    remainingBudget:number,
    startDate:Date,
    endDate:Date
    tasks :TaskView[]

}



  



