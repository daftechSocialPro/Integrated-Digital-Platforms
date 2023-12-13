export interface LoanSettingDto {
    id: string,
    loanName: string,
    amharicName:string
    typeOfLoan: string,
    numberOfMonths?: number,
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
    numberOfMonths?: number,
    maxLoanAmmount?: number,
    paymentYear: number,
    minDeductedPercent?: number,
    maxDeductedPercent?: number,
    remark?: string;
}

