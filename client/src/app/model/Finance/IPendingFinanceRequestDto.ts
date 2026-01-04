export class PendingFinanceRequestDto
{
    id: string;
    projectName: string;
    allocatedBudget: number;
    financeActivities: FinanceActivitiesDto[];
}

export class FinanceActivitiesDto
{
    activityNumber: string;
    activityDescription: string;
    allocatedBudget: string;
    plannedWork: number;
    indicator: string;
    financeWorkedBudgets: FinanceWorkedBudgetDto[];
}

export class FinanceWorkedBudgetDto 
{
    id:string;
    remark: string;
    actualWorked: number;
    usedBudget: number;
    documentPath?: string;
    documents?: string[];
    financeDocument?: string;
    date: Date;
    isApprovedByManager?: string;
    isApprovedByFinance?: string;
    isApprovedByDirector?: string;
    managerApprovalRemark?: string;
    financeApprovalRemark?: string;
    directorApprovalRemark?: string;
    activity?: string;
    activityNumber?: string;
    createdAt?: Date;
}