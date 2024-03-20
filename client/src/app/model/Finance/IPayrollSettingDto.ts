export interface GeneralSettingGetDto{
    id: string
    generalPSetting: string
    value: number
}

export interface GeneralSettingPostDto{
    generalPSetting: string
    value: number
    createdById: string
}

export interface IncomeTaxDto{
    id?: string
    createdById: string
    startingAmount: number
    endingAmount: number
    percent: number
    deductable: number
    endDate: Date
    isActive: boolean

}

export interface BenefitPayrollGetDto{
    taxable: boolean
    payrollReportType: string
    benefitLists: string

}

export interface BenefitPayrollPostDto{
    createdById: string
    benefitId: string[]
    taxable: boolean
    payrollReportType: string
}


