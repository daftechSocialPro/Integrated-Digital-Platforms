export interface LoanSettingDto {
    id: string,
    loanName: string,
    amharicName:string
    typeOfLoan: string,
    maxLoanAmmount: string,
    paymentYear: number,
    minDeductedPercent: number,
    maxDeductedPercent: number,
    remark: string,
}

export interface AddLoanSettingDto {
    id?: string,
    createdById?: string,
    loanName: string,
    amharicName:string
    typeOfLoan: number,
    maxLoanAmmount: number,
    paymentYear: number,
    minDeductedPercent: number,
    maxDeductedPercent: number,
    remark?: string;
}

