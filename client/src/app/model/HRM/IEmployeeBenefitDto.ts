export interface EmployeeBenefitListDto {
    id: string;
    benefitName: string;
    typeofBenefit: string;
    amount: number;
    recursive: boolean;
    allowanceEndDate: string;
}

export interface AddEmployeeBenefitDto {
    createdById: string;
    employeeId: string;
    benefitListId: string;
    typeOfBenefit: number;
    ammount: number;
    recursive: boolean;
    allowanceEndDate?: string;
}