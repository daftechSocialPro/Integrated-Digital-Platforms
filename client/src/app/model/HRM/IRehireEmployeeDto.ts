export interface RehireEmployeeDto {
    employeeId: string;
    createdById: string;
    employmentDate: Date;
    employmentType: number;
    contractEndDate?: Date;
    departmentId: string;
    positionId: string;
    sourceOfSalary: number;
    salary: number;
    remark?: string;
}