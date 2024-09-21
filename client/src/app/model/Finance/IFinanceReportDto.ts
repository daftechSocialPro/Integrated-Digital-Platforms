export interface PayrollReportGetDto{
    employeeName: string
    position: string
    daysWorked: number
    sourceOfFund: string
    salary: number
    transportFuelAllowance: number
    communicationAllowance: number
    positionAllowanceOT: number
    pFEmployerPension: number
    employeePension: number
    totalEarning: number
    taxableIncome: number
    incomeTax: number
    overTime: number;
    pension: number
    loan: number
    totalDeduction: number
    netPay: number
    accountNumber : string

    employeeCode :string
}

export interface PensionReportGetDto{
    totalEmployees: number
    totalEmployeePension: number
    totalEmployerPension: number
    totalPension: number
    pensionEmployees: PensionEmployeesDto[]
    terminatedEmployees: TerminatedEmployeesDto[]
}

export interface PensionEmployeesDto{
    tinNumber?: string
    employeeName: string
    employmentDate: string
    salary: number
    employeePension: number
    employerPension: number
    total: number
}

export interface TerminatedEmployeesDto{
    employeeName: string
    tinNumber?: string
}

export interface IncomeTaxReportGetDto{
    totalNoEmployee: number
    totalIncome: number
    totalTax: number
    month: string
    year: number
    incomeTaxEmployeeDto: IncomeTaxEmployeeDto[]
    terminatedEmployees: TerminatedEmployeesDto[]
}

export interface IncomeTaxEmployeeDto{
    employeeName: string
    tinNumber?: string
    hireDate: string
    basicSalary: number
    transportAllowance: number
    allowance: number
    overTime: number
    otherAllowance: number
    totalIncome: number
    incomeTax: number
    costSharing: number
    netIncome: number

}


