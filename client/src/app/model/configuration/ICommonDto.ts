export interface EducationalFieldPostDto{

    id?:string,
    educationalFieldName : string, 
    remark : string, 
    createdById?:string
    
}

export interface EducationalFieldGetDto {

    id : string ,
    educationalFieldName : string,
    remark : string  

}

export interface EducationalLevelPostDto{

    id?:string,
    educationalLevelName : string, 
    remark : string, 
    createdById?:string
    
}

export interface EducationalLevelGetDto {

    id : string ,
    educationalLevelName : string,
    remark : string  

}



