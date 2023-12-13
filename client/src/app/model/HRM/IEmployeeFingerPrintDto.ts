export interface EmployeeFingerPrintListDto {
    id: string;
    fullName: string;
    department: string;
    fingerPrint: number;
}

export interface AddEmployeeFingerPrintDto {
    id?:string;
    employeeId: string;
    createdById: string;
    fingerPrint: number;
}