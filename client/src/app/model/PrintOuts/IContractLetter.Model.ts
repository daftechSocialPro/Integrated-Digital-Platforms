export interface ContractLetterDto{
    employerName: string;
    employeerAddress: string;
    employeeName: string;
    employeeAddress: string;
    phoneNumber: string;
    typeOfEmployement: string;
    sourceOfFund: string;
    placeOfWork: string;
    ContractStartDate: Date;
    contractEndDate: Date;
    jobTitle: string;
    ReportingTo: string;
    grossSalary: number;
    grossSalaryInWord: string;
    allowanceList: AllowanceListPrintOut[];

}

export interface AllowanceListPrintOut {
    allowance: number;
    allowanceInWord: string;
    allowanceName: string;
}