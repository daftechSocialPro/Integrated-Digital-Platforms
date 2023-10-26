export interface EmployeeDisciplinaryListDto {
    employeeId: string;
    employeeName: string;
    imagePath: string;
    totalWarnings: number;
    disciplinaryCaseLists: DisciplinaryCaseListDto[];
}

export interface DisciplinaryCaseListDto {
    id: string;
    date: Date;
    warningType: string;
    fault: string;
    detailDescription: string;
    approvedDate: Date;
    recorderEmployee: string;
    approverEmployee: string;
}

export interface AddDisciplinaryCaseDto {
    createdById: string;
    employeeId: string;
    date: Date;
    warningType: number;
    fault: string;
    detailDescription: string;
}

export interface ApproveDisciplinaryCase {
    id: string;
    approverId: string;
}