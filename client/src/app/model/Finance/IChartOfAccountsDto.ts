export interface ChartOfAccountsGetDto{
    id: string
    accountType: string
    accountNo: string
    description: string
    onlyControlAccount: boolean
    subsidiaryAccounts: SubsidiaryAccountsGetDto[]
}

export interface SubsidiaryAccountsGetDto{
    id: string
    accountNo: string
    description: string
    sequence: number
    isActive: boolean
    typeOfAccount: string;
}

export interface ChartOfAccountsPostDto{
    id?: string
    accountTypeId: string
    createdById: string
    accountNo: string
    description: string
    onlyControlAccount: boolean
}

export interface SubsidiaryAccountsPostDto{
    id?: string
    chartOfAccountId: string
    accountNo: string
    description: string
    sequence: number
    createdById: string
    typeOfAccount: number;
}

