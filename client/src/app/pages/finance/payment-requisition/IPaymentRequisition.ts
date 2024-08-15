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
    activity: string;
    budgetLine: string;
    requester: string;
    approver: string;
    approvedDate: Date;
    ammount: number;
}

export class ApprovePaymentRequsition {
    id: string;
    employeeId: string;
}
