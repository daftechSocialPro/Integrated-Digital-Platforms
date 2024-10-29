export class GetEmployeeGuaranteeDto
{
    id: string;
    fullName: string;
    amharicFullName: string;
    organizationName: string;
    amharicOrganizationName: string;
    letterNumber: string;
    letterDate: Date;
    letterPath: string;
    isReturned: boolean;
    amharicDate: string;
    todaysDate: string;
    employeeName: string;
    currentSalary: number;
}

export class AddEmployeeGuaranteeDto
{
    id: string;
    employeeId: string;
    createdById: string;
    fullName: string;
    amharicFullName: string;
    organizationName: string;
    amharicOrganizationName: string;
    letterNumber: string;
    letterDate: Date;
}

