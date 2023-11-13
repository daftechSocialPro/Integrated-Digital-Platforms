export interface ITrainerGetDto{

    phoneNumber:string
    email:string
    fullName:string
}

export interface ITrainerPostDto{
    CreatedById?:string
    PhoneNumber:string
    Email:string
    FullName:string
    TrainingId:string
}