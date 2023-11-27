export interface EmployeeListDto {
     id: string;
     imagePath: string;
     fullName: string;
     employeeCode: string;
     gender: string;
     martialStatus: string;
     birthDate:Date;
     employmentDate: Date;
     employmentType: string;
     employmentStatus: string;
}


export interface EmployeePostDto {
     id?: string;
     firstName: string;
     middleName: string;
     lastName: string;
     amharicFirstName: string;
     amharicMiddleName: string;
     amharicLastName: string;
     gender: string;
     birthDate: Date | null;
     maritalStatus: Number;
     imagePath: File | Blob;
     employmentType: string;
     paymentType: string;
     employmentDate: Date| null;
     salary?: Number,
     isPension?: boolean
 
     pensionCode?: string;
     tinNumber?: string;
     bankAccountNo?: string;
     phoneNumber: string;
     ContractEndDate?: Date | null;
     createdById: string;
     email: string;
     zoneId: string;
     woreda: string;
     bankId: string;

}


export interface EmployeeGetDto {
     id: string;
     employeeCode: string;
     employeeName: string;
     firstName: string;
     middleName: string;
     lastName: string;
     amharicFirstName: string;
     amharicMiddleName: string;
     amharicLastName: string;
     gender: string;
     birthDate: Date
     maritalStatus: string;
     imagePath?: string;
     employmentType: string;
     paymentType: string;
     employmentDate: Date;
     contractEndDate?: Date;
     contractDays?: number;
     isPension: boolean;
     employmentStatus: string;
     pensionCode?: string;
     phoneNumber: string;
     tinNumber?: string;
     bankAccountNo?: string;
     email: string;
     departmentId?: string;
     positionId?: string;
     departmentName: string;
     postionName: string;
     countryId: string
     nationality: string;
     regionId: string;
     regionName: string;
     zoneId: string;
     zoneName: string
     woreda: string;
     nationalityId: string;
     isApproved:boolean | false;
     bankId: string;
     salary?: Number,

}

export interface EmployeeHistoryDto {

     id: string;
     departmentName: string;
     positionName: string;
     salary: number;
     startDate: Date;
     endDate: Date;
     employeeId: string;
     departmentId: string;
     positionId: string;
     remark?: string;
     sourceOfSalary: string
     rowStatus: string;
}
export interface EmployeeHistoryPostDto {

     id?: string;
     departmentId: string;
     positionId: string;
     salary: number;
     startDate: Date;
     endDate: Date;
     createdById: string;
     employeeId: string;
     remark?: string;
     sourceOfSalary: string

}


export interface EmployeeSalryPostDto {
     employeeDetailId: string,
     projectName: String
     amount: String,
     createdById?: string
}

export interface EmployeeSalaryGetDto {
     id: string,
     projectName: String
     amount: number,

}


export interface EmployeeFamilyGetDto {

     id: string;
     fullName: string;
     gender: string;
     familyRelation: string;
     birthDate: Date;
     remark: string;


}

export interface EmployeeFamilyPostDto {


     fullName: string;
     gender: string;
     familyRelation: string;
     birthDate: Date;
     remark: string;
     createdById: string;
     employeeId: string;

}

export interface EmployeeEducationGetDto {

     id: string;
     educationalLevel: string;
     educationalLevelId?: string;
     educationalFieldId?: string;
     educationalField: string;
     institution: string;
     fromDate: Date;
     toDate: Date;
     remark: string;
     employeeId: string;

}

export interface EmployeeEducationPostDto {

     id?: string;
     educationalLevelId: string;
     educationalFieldId: string;
     institution: string;
     fromDate: Date;
     toDate: Date;
     remark: string;
     createdById: string;
     employeeId?: string;
     applicantId?: string

}

export interface EmployeeFilePostDto {
     employeeId: string
     fileName: string
     createdById: string


}

export interface EmployeeFileGetDto {

     id: string,
     fileName: string,
     filePath: string
}


export interface EmployeeSuretyPostDto {

     id: string
     fullName: string
     phoneNumber: string
     suretyAddress: string
     idCard: string
     companyName: string
     compnayPhoneNumber: string
     createdById: string
}

export interface EmployeeSuertyGetDto {

     id:string
     photoPath: string
     fullName: string
     phoneNumber: string
     suretyAddress: string
     letterPath: string
     idCardPath: string
     companyName: string
     compnayPhoneNumber: string
     
}


export interface VolunterPostDto {
     id?: string
     firstName: string;
     middleName: string;
     lastName: string;
     amharicName: string,
     phoneNumber: string;
     email: string;
     zoneId: string;
     woreda: string;
     gender: string;
     birthDate: Date
     maritalStatus: Number
   
     ContractEndDate?: Date
     terminatedDate?: Date     
     paymentType: string;
     employmentDate: Date;
     salary?: Number,
     sourceOfSalary:string; 
     bankAccountNo?: string; 
     createdById: string;
     
    

}


export interface VolunterGetDto {
     id: string;

     employeeName: string;
     firstName: string;
     middleName: string;
     lastName: string;
     amharicName: string,
     gender: string;
     birthDate: Date
     maritalStatus: string;
     imagePath?: string;
   
     paymentType: string;
     employmentDate: Date;
     contractEndDate?: Date;
     contractDays?: number
     terminatedDate?: Date;
     salary?:number,
     sourceOfSalary?:string,
     phoneNumber: string;
     tinNumber?: string;
     bankAccountNo?: string;
     email: string;
    
     countryId: string
     nationality: string;
     regionId: string;
     regionName: string;
     zoneId: string;
     zoneName: string
     woreda: string;
     nationalityId: string

}



