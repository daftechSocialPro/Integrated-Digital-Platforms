export interface EmployeeFingerPrintListDto {
    id: string;
    fullName: string;
    department: string;
    fingerPrint: number;
}

export interface AddEmployeeFingerPrintDto {
    employeeId: string;
    createdById: string;
    fingerPrint: number;
}