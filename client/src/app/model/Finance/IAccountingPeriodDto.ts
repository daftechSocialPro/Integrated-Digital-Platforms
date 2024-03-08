export interface AccountingPeriodPostDto{
    createdById:string
    accountingPeriodType: string
    calanderType: string
    description: string
    startDate: Date
}

export interface AccountingPeriodGetDto extends AccountingPeriodPostDto{
    id: string
    endDate: Date
    periodDetails: periodDetails[]
    
}

export interface periodDetails{
    periodNo:number
    periodStart:Date
    periodEnd:Date
}
