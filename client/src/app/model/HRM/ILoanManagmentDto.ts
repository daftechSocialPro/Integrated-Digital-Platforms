export interface LoanInfoDto {
    borrowedAmount: number;
}

export interface LoanRequestDto{
    createdById: string;
    employeeId: string;
    loanSettingId: string;
    totalMoneyRequest: number;
    deductionRequest: number;
}