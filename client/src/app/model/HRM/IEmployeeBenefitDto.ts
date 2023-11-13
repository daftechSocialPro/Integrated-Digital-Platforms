export interface EmployeeBenefitListDto {
    id: string;
    benefitName: string;
    typeofBenefit: string;
    amount: number;
}

export interface AddEmployeeBenefitDto {
    createdById: string;
    employeeId: string;
    benefitListId: string;
    typeOfBenefit: number;
    ammount: number;
}