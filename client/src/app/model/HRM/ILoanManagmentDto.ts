export interface LoanInfoDto {
    borrowedAmount: number;
}

export interface LoanRequestDto {
    createdById: string;
    employeeId: string;
    loanSettingId: string;
    totalMoneyRequest: number;
    deductionRequest: number;
}

export interface RequestedLoanListDto {
    requestId: string;
    requestedDate: Date;
    loanType: string;
    employeeName: string;
    loanTypeName: string;
    requestedAmount: number;
    deductionPercent: number;

}
export interface ApproveInitialRequestDto
{
    requestId: string;
    approverId: string;
    createdBId: string;
}


export interface EmployeeLoanDto  
{
    requestId: string;
    requestedDate: Date;
    employeeName: string;
    loanTypeName: string;
    requestedAmount: number;
    deductionPercent: number;
    approverName: string;
    secondApproverName: string;
    paymentStart: Date;
    paymentEnd: Date;
    currentStatus: string;
}