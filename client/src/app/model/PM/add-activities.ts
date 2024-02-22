export interface ActivityDetailDto {

    Id?:string,
    ActivityDescription:string,
    HasActivity:boolean,
    TaskId:String,
    CreatedBy:string
    ActivityDetails:SubActivityDetailDto[]


}

export interface SubActivityDetailDto {
    Id?:string,
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
    IsTraining:boolean
    IsPercentage:boolean
    RegionId:string,
    Zone?:string,
    Woreda?:string,
    StrategicPlanIndicatorId?:string,
    // longtude: number,
    // latitude: number,
    selectedProjectFund:string

    activityLocations : ActivityLocationDto[]
}

export interface ActivityLocationDto {

    regionId: string;
    zone?: string;
    woreda?: string;
    longtude?: number;
    latitude?: number;
  
}
    
    