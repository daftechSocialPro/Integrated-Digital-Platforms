export interface ITraineeGetDto{

    fullName:string
    phoneNumber:string
    birthDate:Date
    email:string
    educationalField:string
    educationalLevel:string
    gender:String

}


export interface ITraineePostDto{
    TraningId:string
    FullName:string
    PhoneNumber:string
    BirthDate:Date
    Email:string
    EducationalFieldId:string
    EducationalLevelId:string
    Gender:string

}

export interface ITrainerEmailDto {
    FullName:string
    Email:string
    TrainingId:string
 
}
