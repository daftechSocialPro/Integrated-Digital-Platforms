export class PayrollGetDto{
    id: string
    userId: string
    payrollMonth: string
    calculatedCount: number
    preparedBy: string
    checkedBy: string
    approvedBy: string
    totalAmount: number
    isActive: boolean
}

export class CalculatePayrollDto{
    payrollMonth: Date
    userId: string
    recalculate: boolean
}

export interface CheckOrApprovePayrollDto{
    payrollDataId: string
    employeeId: string
}


