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


export interface PlanPerformanceListDto {
    activityNo: string;
    activity: string;
    status: string;
    reasonsForNotComplited: string;
    remark: string;
}
