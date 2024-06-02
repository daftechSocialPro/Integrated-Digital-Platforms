export interface IPaymentRequisitionPostDto {
    date: Date;
    name: string;
    purposeOfRequest: string;
    amountInWord: string;
    amount: number;
    projectId: string;
    budgetReference: string;
    pageNumber: string;
    checkNumber: string;
    requestedById: string;
    createdById: string;
}

export interface IPaymentRequisitionGetDto {
    id: string;
    date: Date;
    name: string;
    purposeOfRequest: string;
    amountInWord: string;
    amount: string;
    project: string;
    budgetReference: string;
    pageNumber: string;
    checkNumber: string;
    isRejected: boolean;
    rejectedRemark?: string;
    requestedById: string;
    requestedBy: string;
    supportedBy: string;
    checkedBy: string;
    approvedBy: string;
    authorizedBy: string;
}
