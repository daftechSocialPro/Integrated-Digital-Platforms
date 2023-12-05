export interface PenaltyListDto {
    id: string;
    fullName: string;
    penaltyType: string;
    penaltyDate: Date;
    amount: number;
    recursive: boolean;
    remark: string;
    approved: boolean;
    totNumber: number;
    fromSalary: boolean;
    penalityendDate: Date;
}

export interface AddPenaltyDto {
    employeeId: string;
    createdById: string;
    penaltyType: number;
    penaltyDate: Date;
    amount: number;
    totNumber: number;
    fromSalary: boolean;
    recursive: boolean;
    penalityendDate?: Date; 
    remark: string;
}