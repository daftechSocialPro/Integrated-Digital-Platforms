export interface BeginningBalanceGetDto{
    id: string
    description: string
    type: string
    ammount: string
}

export interface BeginningBalancePostDto{
    accountingPeriodId: string
    totalCredit: number
    totalDebit: number
    remark: string
    createdById: string
    begningBalanceDetails: BeginngBalanceDetailDto[]
}

export class BeginngBalanceDetailDto{
    chartOfAccountId: string
    chartOfAccountName?: string
    ammount: number
    remark: string
}

