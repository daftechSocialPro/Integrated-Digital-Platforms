export interface EmployeeBankListDto {
    id: string;
    bankName: string;
    accountNumber: string;
}

export interface AddEmployeeBankDto {
    bankId: string;
    employeeId: string;
    createdById: string;
    accountNumber: string;
}