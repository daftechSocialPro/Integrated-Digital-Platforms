using Implementation.Helper;
using IntegratedImplementation.DTOS.Training;
using IntegratedImplementation.DTOS.Vacancy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Interfaces.Training
{
    public interface ITrainingService
    {
        Task<List<TrainingGetDto>> GetTrainingList(Guid activityId);
        Task<List<TrainingGetDto>> GetTrainingList();

        Task<TrainingGetDto> GetSingleTraining(Guid TrainingId);
        Task<ResponseMessage> AddTraining(TrainingPostDto trainingPostDto);

        //trainer

        Task<List<TrainerGetDto>> GetTrainerList(Guid TainingId);
        Task<ResponseMessage> AddTrainer(TrainerPostDto trainingPostDto);

        //trainee 


        Task<List<TraineeGetDto>> GetTraineeList(Guid TainingId);
        Task<ResponseMessage> AddTrainee(TraineePostDto trainingPostDto);


        Task<ResponseMessage> SendEmailTrainer(TrainerEmailDto trainerEmail, string type);

        // trainer report 

        Task<TrainingReportGetDto> GetTrainingReport(Guid TainingId);
        Task<ResponseMessage> AddTrainingReport(TrainingReportPostDto trainingPostDto);

        Task<ResponseMessage> ChangeTraineesStatus(string Status, Guid trainingId);



    }
}
