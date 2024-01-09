export interface IWeeklyPlanDto {
    id?:string
    activity: string;
    placeOfWork: string;
    fromDate: Date;
    toDate: Date;
    employeeId: string;
    employeeName?: string;
    department?: string;
    remark?: string;
    weeklyPlanStatus?: string;
    reasonForNotDone?: string;
    workStatus?: string;
  }