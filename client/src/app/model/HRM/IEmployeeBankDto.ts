export interface EmployeeBankListDto {
    id: string;
    bankName: string;
    bankId: string;
    accountNumber: string;
    isSalaryBank:boolean;
}

export interface AddEmployeeBankDto {
    id?: string;
    bankId: string;
    employeeId: string;
    createdById: string;
    isSalaryBank : boolean
    accountNumber: string;
}