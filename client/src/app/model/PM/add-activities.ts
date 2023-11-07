export interface ActivityDetailDto {

    ActivityDescription:string,
    HasActivity:boolean,
    TaskId:String,
    CreatedBy:string
    ActivityDetails:SubActivityDetailDto[]


}

export interface SubActivityDetailDto {
    SubActivityDesctiption:string,
    StartDate:string,
    EndDate :string,
    PlannedBudget:number,
    ActivityNumber:string,
    ActivityType:number,
    OfficeWork:number,
    FieldWork:number,
    UnitOfMeasurement : string,
    PreviousPerformance:number,
    Goal:number,
    TeamId:string,
    CommiteeId:string,
    PlanId?:string,
    TaskId?:string,
    Employees :string[]
    CreatedBy?:string,
    StrategicPlanId:String,
    
    ZoneId:string,
    Woreda:string,
    longtude: number,
    latitude: number
}

    
    