export interface ITrainingGetDto {

 
    Id:string
    project:string
    endDate:Date
    startDate:Date
    courseVenue:string
    typeofOrganization:string
    nameofOrganizaton:string
    title:string
    activityNumber:string
    reportStatus:string
    traineeListStatus:string

}

export interface ITrainingPostDto{


    CreatedById?:string
    Project:string
    EndDate:Date
    StartDate:Date
    CourseVenue:string
    TypeofOrganization:string
    NameofOrganizaton:string
    Title:string
    ActivityId:string



}


//