export interface ITraineeGetDto{
id:string
    fullName:string
    phoneNumber:string
    age:number
    email:string
    educationalField:string
    educationalLevel:string
    gender:string
    profession : string 
    nameofOrganizaton :string
    typeofOrganization :string 
    region: string 
    zone : string 
    woreda : string
    postSummary?:string
    preSummary?:string
    educationalLevelId:string
    regionId:string


}


export interface ITraineePostDto{
    Id?:string
    TraningId:string
    FullName:string
    PhoneNumber:string
    age:number
    Email:string
    EducationalFieldId:string
    EducationalLevelId:string
    Gender:string
    profession : string 
    nameofOrganizaton :string
    typeofOrganization :string 
    regionId: string 
    zone : string 
    woreda : string
    postSummary?:number
    preSummary?:number

}

export interface ITrainerEmailDto {
    FullName:string
    Email:string
    TrainingId:string
 
}
