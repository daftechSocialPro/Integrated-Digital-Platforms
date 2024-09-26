export interface EmployeeSupervisorsDto {
    id: string;
    employeeName: string;
    immidiateSupervisor: string;
    secondSupervisor: string;
}

export interface AssignSupervisorDto {
    createdById?: string;
    employeeId: string;
    supervisorId: string;
    secondSuprvisorId: string;
}