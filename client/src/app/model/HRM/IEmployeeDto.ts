export interface EmployeePostDto
{   
     id?: string 
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
     
     terminatedDate? : Date
     isPension? : boolean
     employmentStatus : string;
     pensionCode? : string;
     tinNumber? : string;
     bankAccountNo? : string;
     phoneNumber:string;
     departmentId? : string;
     positionId ?: string;
     contractDays ? : Number 
     createdById : string;
     email : string;   
     zoneId : string;
     woreda:string;

}


export interface EmployeeGetDto
{
     id :string;
     employeeCode : string;
     employeeName : string;      
     firstName : string;
     middleName : string;
     lastName : string;       
     gender : string;
     birthDate : Date
     maritalStatus : string;
     imagePath ?: string;
     employmentType : string;
     paymentType : string;
     employmentDate :Date;
     contractEndDate ?:Date;
     contractDays?:number
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
     countryId: string 
     nationality : string;
     regionId : string  ; 
     regionName : string;
     zoneId :string ; 
     zoneName : string 
     woreda:string;
     nationalityId:string


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

     export interface EmployeeEducationGetDto {

          id : string;
          educationalLevel : string;
          educationalLevelId ?: string;
          educationalFieldId ?: string;
          educationalField : string;
          institution : string ; 
          fromDate : Date;
          toDate : Date;
          remark : string;          
          employeeId :string;
         
     }
     
     export interface EmployeeEducationPostDto {
     
          id? : string;
          educationalLevelId : string;
          educationalFieldId : string;
          institution : string ; 
          fromDate : Date;
          toDate : Date;
          remark : string;
          createdById : string;
          employeeId ?:string;
          applicantId?:string
     
     }

  



