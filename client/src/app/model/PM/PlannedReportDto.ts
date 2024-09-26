
export interface IPlannedReport
{
   plansLst : IPlansLst[]
   pMINT : number
   planDuration : QuarterMonth[]
}

export interface QuarterMonth
{
   monthName :string

}
export interface IPlansLst
{
    planName : string
    weight : number
    plRemark : string
    hasTask : boolean
    begining? : number
    target ?: number
    actualWorked? : number
    progress : number
    measurementUnit : string
    taskLsts : ITaskLst[]
    planDivision : IPlanOcc[]
}

export interface ITaskLst
{
    taskDescription : string
    taskWeight : number
    tRemark : string
    hasActParent : boolean
    begining? : number
    target? : number
    actualWorked? : number
    measurementUnit : string
    progress ?: number
    actParentLst : IActParentLst[]
    taskDivisions : IPlanOcc[]
}

export interface IActParentLst
{
    actParentDescription : string
    actParentWeight? : number
    actpRemark : string
    measurementUnit : string
    begining? : number
    target? : number
    actualWorked? : number
    progress ?: number
    activityLsts : IActivityLst[]
    actDivisions : IPlanOcc[]
}
export interface IActivityLst
{
     activityDescription : string
     weight : number
     measurementUnit : string
     begining : number
     target : number
     remark : string
     actualWorked : number
     progress : number
     plans : IPlanOcc[]
}

export interface IPlanOcc
{
    planTarget? : number
    actualWorked? : number
    percentile? : number
}