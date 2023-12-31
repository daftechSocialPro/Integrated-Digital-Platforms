export interface IPlanReportDetailDto
{
    ProgramWithStructure :IProgramWithStructure[]
    MonthCounts : IActivityTargetDivisionReport[]
}
export interface IProgramWithStructure
{
   StrutureName :string
   StructurePlans :IStructurePlan[]
}

export interface IStructurePlan
{
    PlanName:string
    Weight? :number

   UnitOfMeasurement :string

    Target?:number
    PlanTasks:IPlanTask[]
    PlanTargetDivision :IActivityTargetDivisionReport[]
}

export interface IPlanTask
{
     TaskName :string
     Weight? : number
     UnitOfMeasurement:string
     Target?:number
     TaskActivities :ITaskActivity[]
     TaskTargetDivision :IActivityTargetDivisionReport[]
}

export interface ITaskActivity
{
    ActivityName:string
    Weight ?:number
    UnitOfMeasurement: string
    Target?:number
    ActSubActivity :IActSubActivity[]
    ActivityTargetDivision :IActivityTargetDivisionReport[]

}

export interface IActSubActivity
{

    SubActivityDescription :string
    Weight :number
    UnitOfMeasurement:string
    Target :number
   subActivityTargetDivision:IActivityTargetDivisionReport[]

}

export interface IActivityTargetDivisionReport
{
    Order :number
    MonthName :string
    TargetValue :number
}

export interface IPlanReportByProgramDto {
    ProgramViewModels: IProgramViewModel[]
    MonthCounts: IFiscalPlanProgram[]
}
export interface IProgramViewModel {
    ProgramName: string
    ProgramPlanViewModels: IProgramPlanViewModel[]
}

export interface IProgramPlanViewModel {

    ProgramName: string
    PlanNAme: string
    MeasurementUnit: string
    TotalGoal: number
    TotalBirr: number
    FiscalPlanPrograms: IFiscalPlanProgram[]

}

export interface IFiscalPlanProgram {
    PlanNAme: string
    RowORder: number
    MonthName: string
    fisicalValue: number
    FinancialValue: number

}