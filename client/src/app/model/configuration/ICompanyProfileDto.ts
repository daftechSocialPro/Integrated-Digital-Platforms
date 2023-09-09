export interface CompanyProfileGetDto {
     
    id? : string;
    companyName : string;
    phoneNumber : string;
    logo : string ; 
    email : string;
    address : string;
    description:string
 

}

export interface CompanyProfilePostDto {
     
    id? : string;
    companyName : string;
    phoneNumber : string;
    email : string;
    address : string;
    createdById : string;
    description?:string
 

}


