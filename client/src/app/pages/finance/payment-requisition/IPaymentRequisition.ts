export class IPaymentRequisitionPostDto {
    paymentType: number;
    requsitionType: number;
    purpose: string;
    description: string;
    projectId?: string = null;
    purchaseRequestId?: string = null;
    activityId?: string = null;
    budgetLine: string;
    createdById: string;
    ammount: number;
}

export interface IPaymentRequisitionGetDto {
    id: string;
    paymentType: string;
    requsitionType: string;
    purpose: string;
    description: string;
    project: string;
    purchaseREquest: string;
    activityId: string;
    activity: string;
    budgetLine: string;
    requester: string;
    approver: string;
    approvedDate: Date;
    ammount: number;
}

export class PendingRequestAmmountDto
{
    id: string;
    description: string;
    project: string;
    activity: string;
    allocatedBudget: number;
    usedBudget: number;
    ammount: number;
}

export class ApprovePaymentRequsition {
    id: string;
    employeeId: string;
    approve: boolean;
}

export class BudgetByActivityDto {
    activityId: string;
    allocatedBudget: number;
    usedBudget: number;
}
