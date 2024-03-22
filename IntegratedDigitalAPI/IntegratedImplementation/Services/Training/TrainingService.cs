using AutoMapper;
using AutoMapper.QueryableExtensions;
using FluentEmail.Core;
using Implementation.DTOS.Authentication;
using Implementation.Helper;
using IntegratedImplementation.DTOS.Authentication;
using IntegratedImplementation.DTOS.Configuration;
using IntegratedImplementation.DTOS.Training;
using IntegratedImplementation.Helper;
using IntegratedImplementation.Interfaces.Configuration;
using IntegratedImplementation.Interfaces.Training;
using IntegratedInfrustructure.Data;
using IntegratedInfrustructure.Model.Training;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.IO;
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

        private readonly IGeneralConfigService _generalConfig;

        private readonly IConfiguration _configuration;

        public TrainingService(ApplicationDbContext dbContext, IMapper mapper, IEmailService emailService, IGeneralConfigService generalConfig, IConfiguration configuration)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _emailService = emailService;
            _generalConfig = generalConfig;
            _configuration = configuration;
        }


        public async Task<TrainingGetDto> GetSingleTraining(Guid TrainingId)
        {
            var results = await _dbContext.Trainings.Include(x => x.Project).Where(x => x.Id == TrainingId)

                     .Select(x => new TrainingGetDto
                     {
                         Id = x.Id,
                         //ActivityNumber = x.Activity.ActivityNumber,
                         Title = x.Title,
                         AllocatedCEU = x.AllocatedCEU,
                         CourseVenue = x.CourseVenue,
                         StartDate = x.StartDate,
                         EndDate = x.EndDate,
                         Project = x.Project.ProjectName,
                         ReportStatus = x.ReportStatus.ToString(),
                         TraineeListStatus = x.TraineeListStatus.ToString()

                     }).FirstOrDefaultAsync();

            return results;

        }
        public async Task<List<TrainingGetDto>> GetTrainingList(Guid activityId)
        {

            var results = await _dbContext.Trainings.Include(x => x.Project).Where(x => x.ActivityId == activityId)
                        .Include(x => x.Activity).Select(x => new TrainingGetDto
                        {
                            Id = x.Id,
                            ActivityNumber = x.Activity.ActivityNumber,
                            Title = x.Title,
                            ActivityId = x.ActivityId,
                            AllocatedCEU = x.AllocatedCEU,
                            CourseVenue = x.CourseVenue,
                            StartDate = x.StartDate,
                            EndDate = x.EndDate,
                            Project = x.Project.ProjectName,
                            ReportStatus = x.ReportStatus.ToString(),
                            TraineeListStatus = x.TraineeListStatus.ToString()

                        }).ToListAsync();

            return results;

        }

        public async Task<List<TrainingGetDto>> GetTrainingList()
        {
            var results = await _dbContext.Trainings.Include(x => x.Project)

                 .Include(x => x.Activity).Select(x => new TrainingGetDto
                 {
                     Id = x.Id,
                     ActivityNumber = x.Activity.ActivityNumber,
                     Title = x.Title,
                     ActivityId = x.ActivityId,
                     AllocatedCEU = x.AllocatedCEU,

                     CourseVenue = x.CourseVenue,
                     StartDate = x.StartDate,
                     EndDate = x.EndDate,
                     Project = x.Project.ProjectName,
                     ReportStatus = x.ReportStatus.ToString(),
                     TraineeListStatus = x.TraineeListStatus.ToString()

                 }).ToListAsync();

            return results;
        }

        public async Task<ResponseMessage> AddTraining(TrainingPostDto trainingPostDto)
        {

            try
            {
                Guid? projectId = Guid.NewGuid();
                var act = await _dbContext.Activities
                    .Include(x => x.ActivityParent.Task)
                    .Include(x => x.Task)
                    .Where(x => x.Id == trainingPostDto.ActivityId).FirstOrDefaultAsync();

                if (act != null)
                {
                    if (act.TaskId != null)
                    {
                        var task = await _dbContext.Tasks.FindAsync(act.TaskId);
                        if (task != null && task.ProjectId != null)

                        {
                            projectId = task.ProjectId;
                        }

                    }

                    if (act.ActivityParentId != null)
                    {
                        var activityParent = await _dbContext.ActivitiesParents.FindAsync(act.ActivityParentId);

                        if (activityParent != null)
                        {
                            var task = await _dbContext.Tasks.FindAsync(act.ActivityParent.TaskId);
                            if (task != null && task.ProjectId != null)

                            {
                                projectId = task.ProjectId;
                            }
                        }

                    }


                }

                var TrainingPost = new IntegratedInfrustructure.Model.Training.Training
                {
                    Id = Guid.NewGuid(),
                    CreatedDate = DateTime.Now,
                    Title = trainingPostDto.Title,
                    ActivityId = trainingPostDto.ActivityId,
                    AllocatedCEU = trainingPostDto.AllocatedCEU,
                    CourseVenue = trainingPostDto.CourseVenue,
                    StartDate = trainingPostDto.StartDate,
                    EndDate = trainingPostDto.EndDate,
                    ProjectId = projectId,
                    CreatedById = trainingPostDto.CreatedById,
                };

                await _dbContext.Trainings.AddAsync(TrainingPost);
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
                           Id = x.Id,
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

        public async Task<ResponseMessage> UpdateTrainer(TrainerPostDto trainerPostDto)
        {
            try
            {

                var trainer = await _dbContext.Trainers.FindAsync(trainerPostDto.Id);

                if (trainer != null)
                {
                    trainer.FullName = trainerPostDto.FullName;
                    trainer.PhoneNumber = trainerPostDto.PhoneNumber;
                    trainer.Email = trainerPostDto.Email;

                    await _dbContext.SaveChangesAsync();


                    return new ResponseMessage
                    {
                        Success = true,
                        Message = "Trainer Successfully Updated !!!"

                    };
                }




                return new ResponseMessage
                {
                    Success = false,
                    Message = "Trainer Not Found !!!"

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


        public async Task<ResponseMessage> DeleteTrainer(Guid trainerId)
        {
            try
            {
                var trainer = await _dbContext.Trainers.FindAsync(trainerId);
                if (trainer != null)
                {

                    _dbContext.Remove(trainer);

                    await _dbContext.SaveChangesAsync();


                    return new ResponseMessage
                    {
                        Success = true,
                        Message = "Trainer Successfully Deleted !!!"

                    };
                }




                return new ResponseMessage
                {
                    Success = false,
                    Message = "Trainer Not Found !!!"

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
            try
            {

                var results = await _dbContext.Trainees
                    .Include(x => x.EducationalLevel)
                    .Where(x => x.TrainingId == TainingId).OrderBy(x => x.FullName)
                           .Select(x => new TraineeGetDto
                           {
                               Id = x.Id,
                               FullName = x.FullName,
                               Email = x.Email,
                               PhoneNumber = x.PhoneNumber,
                               Age = x.Age,
                               Gender = x.Gender.ToString(),
                               EducationalField = x.EducationalField,
                               EducationalLevel = x.EducationalLevel.EducationalLevelName,
                               EducationalLevelId = x.EducationalLevelId,
                               RegionId = x.RegionId,
                               Region = x.Region.RegionName,
                               Zone = x.Zone,
                               Woreda = x.Woreda,
                               Profession = x.Profession,
                               TypeofOrganization = x.TypeofOrganization,
                               NameofOrganizaton = x.NameofOrganizaton,
                               PreSummary = (double)x.PreSummary,
                               PostSummary = (double)x.PostSummary,
                           }).ToListAsync();

                return results;
            }
            catch (Exception ex)
            {
                throw new Exception();
            }

        }
        public async Task<ResponseMessage> AddTrainee(TraineePostDto trainerPostDto)
        {
            try
            {

                var TraineePost = new Trainee
                {
                    Id = Guid.NewGuid(),
                    TrainingId = trainerPostDto.TraningId,

                    FullName = trainerPostDto.FullName,
                    EducationalField = trainerPostDto.EducationalField,
                    EducationalLevelId = trainerPostDto.EducationalLevelId,
                    PhoneNumber = trainerPostDto.PhoneNumber,
                    Email = trainerPostDto.Email,
                    Age = trainerPostDto.Age,
                    Gender = Enum.Parse<Gender>(trainerPostDto.Gender),
                    RegionId = trainerPostDto.RegionId,
                    Zone = trainerPostDto.Zone,
                    Woreda = trainerPostDto.Woreda,
                    NameofOrganizaton = trainerPostDto.NameofOrganizaton,
                    TypeofOrganization = trainerPostDto.TypeofOrganization,
                    Profession = trainerPostDto.Profession,
                    PostSummary = trainerPostDto.PostSummary != null ? (double)trainerPostDto.PostSummary : 0.0,
                    PreSummary = trainerPostDto.PreSummary

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

        public async Task<ResponseMessage> DeleteTrainee(Guid traineeId)
        {
            try
            {
                var trainee = await _dbContext.Trainees.FindAsync(traineeId);
                if (trainee != null)
                {
                    _dbContext.Remove(trainee);
                    _dbContext.SaveChanges();
                    return new ResponseMessage { Success = true, Message = "Successfully Deleted!!!" };
                }
                return new ResponseMessage { Success = false, Message = "trainee not found" };


            }
            catch (Exception ex)
            {
                return new ResponseMessage { Success = false, Message = ex.Message };
            }
        }
        public async Task<ResponseMessage> UpdateTrainee(TraineePostDto trainerPostDto)
        {
            try
            {
                var trainee = await _dbContext.Trainees.FindAsync(trainerPostDto.Id);



                trainee.FullName = trainerPostDto.FullName;
                trainee.EducationalField = trainerPostDto.EducationalField;
                trainee.EducationalLevelId = trainerPostDto.EducationalLevelId;
                trainee.PhoneNumber = trainerPostDto.PhoneNumber;
                trainee.Email = trainerPostDto.Email;
                trainee.Age = trainerPostDto.Age;
                trainee.Gender = Enum.Parse<Gender>(trainerPostDto.Gender);
                trainee.RegionId = trainerPostDto.RegionId;
                trainee.Zone = trainerPostDto.Zone;
                trainee.Woreda = trainerPostDto.Woreda;
                trainee.NameofOrganizaton = trainerPostDto.NameofOrganizaton;
                trainee.TypeofOrganization = trainerPostDto.TypeofOrganization;
                trainee.Profession = trainerPostDto.Profession;
                trainee.PostSummary = trainerPostDto.PostSummary;
                trainee.PreSummary = trainerPostDto.PreSummary;
                await _dbContext.SaveChangesAsync();

                return new ResponseMessage
                {
                    Success = true,
                    Message = "Trainee Successfully Updated !!!"

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
        public async Task<ResponseMessage> SendEmailTrainer(TrainerEmailDto trainerEmail, string type)
        {
            try
            {
                var appSettings = _configuration.GetSection("ApplicationSetting");

                var clientUrl = appSettings["Client_URL"];


                var url = type == "report" ? $"{clientUrl}/trainee-form/training-report-form/" : $"{clientUrl}/trainee-form/";

                var email = new EmailMetadata
                  (trainerEmail.Email, "Trainees List",
                      $"Dear {trainerEmail.FullName},\n\n by clicking the link below you can add the trainees {url}{trainerEmail.TrainingId}.\n\nSincerely,\nEMIA");
                var result = await _emailService.Send(email);

                if (result.Success)
                {


                    var training = await _dbContext.Trainings.FindAsync(trainerEmail.TrainingId);

                    if (training != null)
                    {

                        if (type == "report")
                        {
                            training.ReportStatus = ReportStatus.SENT;
                        }
                        else
                        {
                            training.TraineeListStatus = TraineeListStatus.SENT;
                        }

                        await _dbContext.SaveChangesAsync();
                    }


                    return new ResponseMessage
                    {
                        Success = true,
                        Message = $"Email send to {trainerEmail.FullName} Sucessfully !!!"
                    };
                }
                else
                {
                    return new ResponseMessage
                    {
                        Success = false,
                        Message = result.Message
                    };
                }

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

        //training report 

        public async Task<TrainingReportGetDto> GetTrainingReport(Guid TainingId)
        {

            var result = await _dbContext.TrainingReports.Include(x => x.ReportAttachments).Where(x => x.TrainingId == TainingId)

                               .Select(tr => new TrainingReportGetDto
                               {
                                   Id = tr.Id,
                                   Objective = tr.Objective,
                                   Contribution = tr.Contribution,
                                   TraineesDescription = tr.TraineesDescription,
                                   Challenges = tr.Challenges,
                                   LessonsLearned = tr.LessonsLearned,
                                   Summary = tr.Summary,
                                   TopicsCoverd = tr.TopicsCoverd,
                                   PrePostSummary = tr.PrePostSummary,
                                   Attachments = tr.ReportAttachments.Where(x => x.FileType == FileType.ATTACHMENT).Select(x => x.FilePath).ToList(),

                                   Images = tr.ReportAttachments.Where(x => x.FileType == FileType.IMAGES).Select(x => x.FilePath).ToList(),





                               }).FirstOrDefaultAsync();


            return result;

        }
        public async Task<ResponseMessage> AddTrainingReport(TrainingReportPostDto trainingPostDto)
        {
            try
            {
                var trainingReport = await _dbContext.TrainingReports.Where(x => x.TrainingId == trainingPostDto.TrainingId).FirstOrDefaultAsync();

                if (trainingReport == null)
                {
                    var TrainingPost = new TrainingReport
                    {
                        Id = Guid.NewGuid(),
                        TrainingId = trainingPostDto.TrainingId,
                        Objective = trainingPostDto.Objective,
                        Contribution = trainingPostDto.Contribution,
                        TraineesDescription = trainingPostDto.TraineesDescription,
                        TopicsCoverd = trainingPostDto.TopicsCoverd,
                        Challenges = trainingPostDto.Challenges,
                        LessonsLearned = trainingPostDto.LessonsLearned,
                        Summary = trainingPostDto.Summary,
                        PrePostSummary = trainingPostDto.PrePostSummary,
                        CreatedDate = DateTime.Now,

                    };

                    await _dbContext.TrainingReports.AddAsync(TrainingPost);
                    await _dbContext.SaveChangesAsync();





                    var training = _dbContext.Trainings.Find(trainingPostDto.TrainingId);

                    if (training != null)
                    {
                        training.ReportStatus = Enum.Parse<ReportStatus>(trainingPostDto.ReportStatus);

                        await _dbContext.SaveChangesAsync();


                    }



                    if (trainingPostDto.Images != null)
                    {

                        foreach (var image in trainingPostDto.Images)
                        {

                            var path = "";
                            var Id = Guid.NewGuid();

                            if (image != null)
                                path = _generalConfig.UploadFiles(image, Id.ToString(), $"Trainner/{training.Title}/").Result.ToString();


                            var reportAttachemnts = new TrainingReportAttachment
                            {

                                Id = Id,
                                TrainingReportId = TrainingPost.Id,
                                FileType = FileType.IMAGES,
                                FilePath = path


                            };



                            await _dbContext.TrainingReportAttachments.AddAsync(reportAttachemnts);
                            await _dbContext.SaveChangesAsync();


                        }
                    }
                    if (trainingPostDto.Attachments != null)
                    {

                        foreach (var image in trainingPostDto.Attachments)
                        {

                            var path = "";
                            var Id = Guid.NewGuid();

                            if (image != null)
                                path = _generalConfig.UploadFiles(image, Id.ToString(), $"Trainner/{training.Title}/Attachment").Result.ToString();


                            var reportAttachemnts = new TrainingReportAttachment
                            {

                                Id = Id,
                                TrainingReportId = TrainingPost.Id,
                                FileType = FileType.ATTACHMENT,
                                FilePath = path


                            };



                            await _dbContext.TrainingReportAttachments.AddAsync(reportAttachemnts);
                            await _dbContext.SaveChangesAsync();


                        }
                    }









                    return new ResponseMessage
                    {
                        Success = true,
                        Message = "Training Report Successfully Added !!!"

                    };
                }
                else
                {

                    var trainingReport2 = await _dbContext.TrainingReports.FindAsync(trainingPostDto.Id);
                    trainingReport2.Challenges = trainingPostDto.Challenges;
                    trainingReport2.Objective = trainingPostDto.Objective;
                    trainingReport2.Contribution = trainingPostDto.Contribution;
                    trainingReport2.TraineesDescription = trainingPostDto.TraineesDescription;
                    trainingReport2.TopicsCoverd = trainingPostDto.TopicsCoverd;
                    trainingReport2.LessonsLearned = trainingPostDto.LessonsLearned;
                    trainingReport2.Summary = trainingPostDto.Summary;
                    trainingReport2.PrePostSummary = trainingPostDto.PrePostSummary;
                    await _dbContext.SaveChangesAsync();

                    var training = _dbContext.Trainings.Find(trainingPostDto.TrainingId);

                    if (training != null)
                    {
                        training.ReportStatus = Enum.Parse<ReportStatus>(trainingPostDto.ReportStatus);

                        await _dbContext.SaveChangesAsync();


                    }

                    if (trainingPostDto.Images != null)
                    {
                        foreach (var image in trainingPostDto.Images)
                        {

                            var path = "";
                            var Id = Guid.NewGuid();

                            if (image != null)
                                path = _generalConfig.UploadFiles(image, Id.ToString(), $"Trainner/{training.Title}/").Result.ToString();


                            var reportAttachemnts = new TrainingReportAttachment
                            {

                                Id = Id,
                                TrainingReportId = trainingReport2.Id,
                                FileType = FileType.IMAGES,
                                FilePath = path


                            };



                            await _dbContext.TrainingReportAttachments.AddAsync(reportAttachemnts);
                            await _dbContext.SaveChangesAsync();


                        }
                    }

                    if (trainingPostDto.Attachments != null)
                    {
                        foreach (var image in trainingPostDto.Attachments)
                        {

                            var path = "";
                            var Id = Guid.NewGuid();

                            if (image != null)
                                path = _generalConfig.UploadFiles(image, Id.ToString(), $"Trainner/{training.Title}/Attachment").Result.ToString();


                            var reportAttachemnts = new TrainingReportAttachment
                            {

                                Id = Id,
                                TrainingReportId = trainingReport2.Id,
                                FileType = FileType.ATTACHMENT,
                                FilePath = path


                            };



                            await _dbContext.TrainingReportAttachments.AddAsync(reportAttachemnts);
                            await _dbContext.SaveChangesAsync();


                        }

                    }

                    return new ResponseMessage
                    {
                        Success = true,
                        Message = "Training Report Successfully Updated !!!"

                    };
                }

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


        public async Task<ResponseMessage> ChangeTraineesStatus(string Status, Guid trainingId)
        {


            var training = await _dbContext.Trainings.FindAsync(trainingId);
            if (training != null)
            {

                training.TraineeListStatus = Enum.Parse<TraineeListStatus>(Status);

                await _dbContext.SaveChangesAsync();
                return new ResponseMessage
                {
                    Success = true,
                    Message = " Successfully Submitted !!!"
                };

            }
            else
            {

                return new ResponseMessage
                {
                    Success = false,
                    Message = "training not found"
                };
            }
        }

        public async Task<ResponseMessage> UpdateTraining(TrainingPostDto trainingPostDto)
        {
            try
            {
                var training = await _dbContext.Trainings.FindAsync(trainingPostDto.Id);

                if (training != null)
                {

                    training.Title = trainingPostDto.Title;
                    training.AllocatedCEU = trainingPostDto.AllocatedCEU;
                    training.CourseVenue = trainingPostDto.CourseVenue;
                    training.StartDate = trainingPostDto.StartDate;
                    training.EndDate = trainingPostDto.EndDate;

                    await _dbContext.SaveChangesAsync();

                    return new ResponseMessage
                    {
                        Success = true,
                        Message = "Training Successfully Deleted !!!"

                    };

                }
                else
                {
                    return new ResponseMessage
                    {
                        Success = false,
                        Message = "Training Not Found!!!"

                    };
                }



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

        public async Task<ResponseMessage> DeleteTraining(Guid trainingId)
        {
            try
            {
                var training = await _dbContext.Trainings.FindAsync(trainingId);
                if (training != null)
                {
                    var trainerList = await _dbContext.Trainers.Where(x=>x.TrainingId == trainingId).ToListAsync();
                    var traineeList = await _dbContext.Trainees.Where(x=>x.TrainingId == trainingId).ToListAsync();

                    _dbContext.RemoveRange(traineeList);
                    _dbContext.RemoveRange(trainerList); 
                    _dbContext.RemoveRange(training);

                    await _dbContext.SaveChangesAsync();

                    return new ResponseMessage
                    {
                        Success = true,
                        Message = "Training Successfully Deleted!!!"

                    };

                }
                else
                {
                    return new ResponseMessage
                    {
                        Success = false,
                        Message = "Training Not Found!!!"

                    };
                }

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

        public async Task<ResponseMessage> ImportTraineeFormExcel(IFormFile ExcelFile)
        {
            try
            {
                int counter = 0;
                using (var package = new ExcelPackage(ExcelFile.OpenReadStream()))
                {
                    ExcelWorksheet worksheet = package.Workbook.Worksheets[0];

                    int rowCount = worksheet.Dimension.Rows;


                    for (int row = 2; row <= rowCount; row++) // Assuming the data starts from the second row
                    {
                        Trainee trainee = new Trainee();
                        var fullName = worksheet.Cells[row, 1].Value?.ToString() ?? string.Empty;
                        var PhoneNumber = worksheet.Cells[row, 6].Value?.ToString() ?? string.Empty;
                        var trainingId = worksheet.Cells[row,15].Value?.ToString() ?? string.Empty;
                     
                        var result = _dbContext.Trainees.Where(x=>x.TrainingId==Guid.Parse(trainingId) && x.PhoneNumber==PhoneNumber && x.FullName.ToLower() == fullName.ToLower()).Any();

                        if (!result)
                        {

                            var gender = worksheet.Cells[row, 2].Value?.ToString().Trim() ?? string.Empty;
                            var age = worksheet.Cells[row, 3].Value?.ToString().Trim() ?? string.Empty;
                            var Profession = worksheet.Cells[row, 4].Value?.ToString().Trim() ?? string.Empty;
                            var levelOfEducation = worksheet.Cells[row, 5].Value?.ToString()?.Trim() ?? string.Empty;
                            var selectedlevelOfEducation = await _dbContext.EducationalLevels.Where(x => x.EducationalLevelName == levelOfEducation).FirstOrDefaultAsync();

                            if (selectedlevelOfEducation == null)
                            {

                                return new ResponseMessage
                                {
                                    Data = $"Level Of Education {levelOfEducation} is not Found for Trainee {fullName}!! \n{counter} Members Added Successfully",
                                    Message = "Excel Format Error",
                                    Success = false
                                };

                            }


                            var email = worksheet.Cells[row, 7].Value?.ToString().Trim() ?? string.Empty;

                            var region = worksheet.Cells[row, 8].Value?.ToString()?.Trim() ?? string.Empty;
                            var selectedRegion = await _dbContext.Regions.Where(x => x.RegionName == region).FirstOrDefaultAsync();

                            if (selectedRegion == null)
                            {

                                return new ResponseMessage
                                {
                                    Data = $"Selected Region {region} is not Found for Trainee {fullName}!! \n{counter} Members Added Successfully",
                                    Message = "Excel Format Error",
                                    Success = false
                                };

                            }
                            var zone = worksheet.Cells[row, 9].Value?.ToString().Trim() ?? string.Empty;
                            var woreda = worksheet.Cells[row, 10].Value?.ToString().Trim() ?? string.Empty;
                            var organization = worksheet.Cells[row, 11].Value?.ToString().Trim() ?? string.Empty;
                            var organizationType = worksheet.Cells[row, 12].Value?.ToString().Trim() ?? string.Empty;
                            var preTrainingSummary = worksheet.Cells[row, 13].Value?.ToString().Trim() ?? string.Empty;
                            var postTrainingSummary = worksheet.Cells[row, 14].Value?.ToString().Trim() ?? string.Empty;

                           
                            trainee.Id = Guid.NewGuid();
                            trainee.FullName = fullName;
                            trainee.PhoneNumber = PhoneNumber;
                            trainee.Profession = Profession;
                            trainee.TrainingId = Guid.Parse(trainingId);
                            trainee.Gender = gender!= string.Empty?  Enum.Parse<Gender>(gender):Gender.FEMALE;
                            trainee.Age = Int32.Parse(age);
                            trainee.EducationalLevelId = selectedlevelOfEducation.Id;
                            trainee.Email = email;
                            trainee.RegionId = selectedRegion.Id;
                            trainee.Zone = zone;
                            trainee.Woreda = woreda;
                            trainee.NameofOrganizaton = organization;
                            trainee.EducationalField = "";
                            trainee.TypeofOrganization = organizationType;
                            trainee.PreSummary = preTrainingSummary!=string.Empty? Int32.Parse(preTrainingSummary):0;
                            trainee.PostSummary = postTrainingSummary!=string.Empty? Int32.Parse(postTrainingSummary):0;


                            await _dbContext.Trainees.AddAsync(trainee);
                            await _dbContext.SaveChangesAsync();



                            counter += 1;




                        }
                        else
                        {
                            return new ResponseMessage
                            {
                                Data = $"PhoneNumber {PhoneNumber} registerd on Member {fullName} is already Exists !! \n{counter} Trainee Added Successfully ",
                                Message = "Excel Format Error",
                                Success = false
                            };
                        }






                    }
                }
                return new ResponseMessage
                {
                    Data = $"{counter} Trainees Added Successfully!",
                    Message = "Add Successfully From Excel!!!",
                    Success = true
                };

            }
            catch (Exception ex)
            {
                return new ResponseMessage
                {

                    Message = ex.InnerException.Message,
                    Success = false
                };
            }
        }
    }


}
