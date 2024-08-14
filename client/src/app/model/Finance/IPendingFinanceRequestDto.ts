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
    remark: string;
    actualWorked: number;
    usedBudget: number;
    documentPath: string;
    date: Date;
}