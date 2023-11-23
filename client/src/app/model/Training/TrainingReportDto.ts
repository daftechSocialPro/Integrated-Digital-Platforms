export interface ITrainingReportPostDto {
    Id?:string
    TrainingId : string 
    Objective:string
    Contribution:string
    TraineesDescription:string
    TopicsCoverd:string
    Challenges:string
    LessonsLearned:string
    Summary:string
    PrePostSummary:string

    ReportStatus:string
  
}

export interface ITrainingReportGetDto {
      
    id:string
    objective:string
    contribution:string
    traineesDescription:string
    topicsCoverd:string
    challenges:string
    lessonsLearned:string
    summary:string
    prePostSummary:string

}
