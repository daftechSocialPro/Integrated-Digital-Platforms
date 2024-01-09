export interface ITraineeGetDto{

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


}


export interface ITraineePostDto{
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

}

export interface ITrainerEmailDto {
    FullName:string
    Email:string
    TrainingId:string
 
}
