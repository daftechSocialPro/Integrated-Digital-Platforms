export interface LoanSettingDto {
    id: string,
    loanName: string,
    typeOfLoan: string,
    maxLoanAmmount: string,
    paymentYear: number,
    minDeductedPercent: number,
    maxDeductedPercent: number,
}

export interface AddLoanSettingDto {
    id?: number,
    createdById?: string,
    loanName: string,
    typeOfLoan: number,
    maxLoanAmmount: number,
    paymentYear: number,
    minDeductedPercent: number,
    maxDeductedPercent: number,
}

