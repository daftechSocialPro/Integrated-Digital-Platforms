export interface EmployeePostDto
{
   
     firstName : string;
     middleName : string;
     lastName : string;
     gender : string;
     birthDate : Date
     maritalStatus:Number
     imagePath :  File | Blob;
     employmentType : string;
     paymentType : string;
     employmentDate : Date
     contractEndDate? : Date
     terminatedDate? : Date
     isPension? : boolean
     employmentStatus : string;
     pensionCode? : string;
     tinNumber? : string;
     bankAccountNo? : string;
     phoneNumber:string;
     departmentId : string;
     positionId : string;
     contractDays ? : Number 
     createdById : string;
     email : string;   
     regionId : string;
     woreda:string;

}


export interface EmployeeGetDto
{
     id :string;
     employeeCode : string;
     employeeName : string;        
     gender : string;
     birthDate : Date
     maritalStatus : string;
     imagePath ?: string;
     employmentType : string;
     paymentType : string;
     employmentDate :Date;
     contractEndDate ?:Date;
     terminatedDate ?:Date;
     isPension: boolean;
     employmentStatus : string;
     pensionCode? : string;
     phoneNumber:string;
     tinNumber? : string;
     bankAccountNo? : string;     
     email : string;
     departmentName : string;
     postionName : string;
     nationality : string;
     regionName : string;
     woreda:string;


}

export interface EmployeeHistoryDto {

     id : string;
     departmentName:string; 
     positionName : string;  
     salary : number ; 
     startDate : Date;
     endDate : Date;
     employeeId :string;
     departmentId :string ; 
     positionId : string ;
}
export interface EmployeeHistoryPostDto {

     id ?: string;
     departmentId : string;
     positionId : string;
     salary : number ; 
     startDate : Date;
     endDate : Date;
     createdById : string;
     employeeId :string;

}



export interface EmployeeFamilyGetDto {

     id : string;
     fullName:string; 
     gender : string;  
     familyRelation : string ; 
     birthDate : Date;
     remark : string;
     
    
}

export interface EmployeeFamilyPostDto {

    
     fullName : string;
     gender : string;
     familyRelation : string ; 
     birthDate : Date;
     remark : string;
     createdById : string;
     employeeId :string;

}





