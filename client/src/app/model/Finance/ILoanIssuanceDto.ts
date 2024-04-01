export interface ApprovedLoansDto{
    id: string
    employeeCode: string
    employeeName: string
    currentSalary: number
    givenAmmount: number
    monthlyPayment: number
    returnPeriod: number
    totalPayment: number
    initialApprover: string
    secondApprover: string
    loanStatus: string
}

export interface LoanPaymentDto{
    employeeLoanId: string
    totalPayment: number
    createdById: string
}


