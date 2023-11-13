using AutoMapper;
using Implementation.Helper;
using IntegratedImplementation.DTOS.Training;
using IntegratedImplementation.Helper;
using IntegratedImplementation.Interfaces.Configuration;
using IntegratedImplementation.Interfaces.Training;
using IntegratedInfrustructure.Data;
using IntegratedInfrustructure.Model.Training;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.Services.Training
{
    public class TrainingService : ITrainingService
    {
        private readonly ApplicationDbContext _dbContext;

        private readonly IEmailService _emailService;

        private readonly IMapper _mapper;

        public TrainingService(ApplicationDbContext dbContext, IMapper mapper,IEmailService emailService)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _emailService = emailService;
        }


        public async Task<TrainingGetDto> GetSingleTraining(Guid TrainingId)
        {
            var results = await _dbContext.Trainings.Where(x => x.Id == TrainingId)
                      
                     .Select(x => new TrainingGetDto
                      {
                          Id = x.Id,
                          //ActivityNumber = x.Activity.ActivityNumber,
                          Title = x.Title,
                          NameofOrganizaton = x.NameofOrganizaton,
                          TypeofOrganization = x.TypeofOrganization,
                          CourseVenue = x.CourseVenue,
                          StartDate = x.StartDate,
                          EndDate = x.EndDate,
                          Project = x.Project,
                          ReportStatus = x.ReportStatus.ToString(),
                          TraineeListStatus = x.TraineeListStatus.ToString()

                      }).FirstOrDefaultAsync();

            return results;

        }
        public async Task<List<TrainingGetDto>> GetTrainingList(Guid activityId)
        {

            var results = await _dbContext.ActivityTrainings.Where(x => x.ActivityId == activityId)
                        .Include(x => x.Training)
                        .Include(x => x.Activity).Select(x => new TrainingGetDto
                        {
                            Id = x.TrainingId,
                            ActivityNumber = x.Activity.ActivityNumber,
                            Title = x.Training.Title,
                            NameofOrganizaton = x.Training.NameofOrganizaton,
                            TypeofOrganization = x.Training.TypeofOrganization,
                            CourseVenue = x.Training.CourseVenue,
                            StartDate = x.Training.StartDate,
                            EndDate = x.Training.EndDate,
                            Project = x.Training.Project,
                            ReportStatus = x.Training.ReportStatus.ToString(),
                            TraineeListStatus = x.Training.TraineeListStatus.ToString()

                        }).ToListAsync();

            return results;

        }

        public async Task<ResponseMessage> AddTraining(TrainingPostDto trainingPostDto)
        {

            try
            {
                var TrainingPost = new IntegratedInfrustructure.Model.Training.Training
                {
                    Id = Guid.NewGuid(),
                    CreatedDate = DateTime.Now,
                    Title = trainingPostDto.Title,
                    NameofOrganizaton = trainingPostDto.NameofOrganizaton,
                    TypeofOrganization = trainingPostDto.TypeofOrganization,
                    CourseVenue = trainingPostDto.CourseVenue,
                    StartDate = trainingPostDto.StartDate,
                    EndDate = trainingPostDto.EndDate,
                    Project = trainingPostDto.Project,
                    CreatedById = trainingPostDto.CreatedById,
                };

                await _dbContext.Trainings.AddAsync(TrainingPost);
                await _dbContext.SaveChangesAsync();


                var activityTraining = new ActivityTraining
                {
                   Id = Guid.NewGuid(),
                   CreatedDate = DateTime.Now,
                   CreatedById = trainingPostDto.CreatedById,
                   ActivityId = trainingPostDto.ActivityId,
                   TrainingId = TrainingPost.Id

                };

                await _dbContext.ActivityTrainings.AddAsync(activityTraining);
                await _dbContext.SaveChangesAsync();
                


                return new ResponseMessage
                {
                    Success = true,
                    Message = "Training Successfully Added !!!"

                };
            }
            catch (Exception ex)
            {

                return new ResponseMessage
                {
                    Success = false,
                    Message = ex.Message
                };

            }



        }

        //trainer

      public async Task<List<TrainerGetDto>> GetTrainerList(Guid TainingId)
        {

            var results = await _dbContext.Trainers.Where(x => x.TrainingId == TainingId)
                       .Select(x => new TrainerGetDto
                        {
                         FullName = x.FullName,
                         Email = x.Email,
                         PhoneNumber = x.PhoneNumber,

                        }).ToListAsync();

            return results;

        }
        public async Task<ResponseMessage> AddTrainer(TrainerPostDto trainerPostDto)
        {
            try
            {
                var TrainerPost = new Trainers
                {
                    Id = Guid.NewGuid(),
                    TrainingId = trainerPostDto.TrainingId,
                    CreatedDate = DateTime.Now,
                    FullName = trainerPostDto.FullName,
                    PhoneNumber = trainerPostDto.PhoneNumber,
                    Email = trainerPostDto.Email,
                    CreatedById = trainerPostDto.CreatedById,
                };

                await _dbContext.Trainers.AddAsync(TrainerPost);
                await _dbContext.SaveChangesAsync();

                return new ResponseMessage
                {
                    Success = true,
                    Message = "Trainer Successfully Added !!!"

                };

            }
            catch (Exception ex)
            {
                return new ResponseMessage
                {
                    Success = false,
                    Message = ex.Message
                };

            }

        }

        //trainee 

        public async Task<List<TraineeGetDto>> GetTraineeList(Guid TainingId)
        {

            var results = await _dbContext.Trainees
                .Include(x=>x.EducationalLevel)
                .Include(x=>x.EducationalField).Where(x => x.TrainingId == TainingId)
                       .Select(x => new TraineeGetDto
                       {
                           FullName = x.FullName,
                           Email = x.Email,
                           PhoneNumber = x.PhoneNumber,
                           BirthDate = x.BirthDate,
                           Gender = x.Gender.ToString(),
                           EducationalField = x.EducationalField.EducationalFieldName,
                           EducationalLevel = x.EducationalLevel.EducationalLevelName
                       }).ToListAsync();

            return results;

        }
        public async Task<ResponseMessage> AddTrainee(TraineePostDto trainerPostDto)
        {
            try
            {
                
                var TraineePost = new Trainee
                {
                    Id = Guid.NewGuid(),
                    TrainingId = trainerPostDto.TraningId,
                    CreatedDate = DateTime.Now,
                    FullName = trainerPostDto.FullName,
                    EducationalFieldId = trainerPostDto.EducationalFieldId,
                    EducationalLevelId = trainerPostDto.EducationalLevelId,
                    PhoneNumber = trainerPostDto.PhoneNumber,
                    Email = trainerPostDto.Email,
                    BirthDate = trainerPostDto.BirthDate,
                    Gender = Enum.Parse<Gender>( trainerPostDto.Gender),
                    CreatedById = "18eef146-fc48-4074-94e7-e5dd4a3be236",
                };

                await _dbContext.Trainees.AddAsync(TraineePost);
                await _dbContext.SaveChangesAsync();

                return new ResponseMessage
                {
                    Success = true,
                    Message = "Trainee Successfully Added !!!"

                };

            }
            catch (Exception ex)
            {
                return new ResponseMessage
                {
                    Success = false,
                    Message = ex.Message
                };

            }

        }


       public async Task<ResponseMessage> SendEmailTrainer(TrainerEmailDto trainerEmail)
        {
            try
            {

                var email = new EmailMetadata
                  (trainerEmail.Email, "Trainees List",
                      $"Dear {trainerEmail.FullName},\n\n by clicking the link below you can add the trainees http://localhost:4200/trainee-form/{trainerEmail.TrainingId}.\n\nSincerely,\nEMIA");
               var result =  await _emailService.Send(email);

                return new ResponseMessage
                {
                    Success = true,
                    Message = $"Email send to {trainerEmail.FullName} Sucessfully !!!"
                };

            }catch  (Exception ex)
            {
                return new ResponseMessage
                {

                    Success = false,
                    Message = ex.Message
                };
            }



        }
    }
}
