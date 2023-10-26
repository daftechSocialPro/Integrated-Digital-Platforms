export interface StaffWeeklyPlanDto {
    activityNo: string;
    activity: string;
    placeOfWork: string;
    executionDate: Date;
    responsible: string;
}

export interface FilterDateCriteriaDto {
    fromDate: Date;
    toDate: Date;
}