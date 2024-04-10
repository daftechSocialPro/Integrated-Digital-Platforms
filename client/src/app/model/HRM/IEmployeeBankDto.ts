export interface EmployeeBankListDto {
    id: string;
    bankName: string;
    accountNumber: string;
    isSalaryBank:boolean;
}

export interface AddEmployeeBankDto {
    bankId: string;
    employeeId: string;
    createdById: string;
    isSalaryBank : boolean
    accountNumber: string;
}