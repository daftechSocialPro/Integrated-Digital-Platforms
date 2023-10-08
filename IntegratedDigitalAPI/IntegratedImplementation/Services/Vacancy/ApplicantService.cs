using AutoMapper;
using AutoMapper.QueryableExtensions;
using Implementation.Helper;
using IntegratedImplementation.DTOS.HRM;
using IntegratedImplementation.DTOS.Vacancy;
using IntegratedImplementation.Interfaces.Configuration;
using IntegratedImplementation.Interfaces.HRM;
using IntegratedImplementation.Interfaces.Vacancy;
using IntegratedImplementation.Services.HRM;
using IntegratedInfrustructure.Data;
using IntegratedInfrustructure.Model.HRM;
using IntegratedInfrustructure.Model.Vacancy;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.Services.Vacancy
{
    public class ApplicantService : IApplicantService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IGeneralConfigService _generalConfig;
        private readonly IMapper _mapper;

        public ApplicantService(ApplicationDbContext dbContext, IGeneralConfigService generalConfig, IMapper mapper)
        {
            _dbContext = dbContext;
            _generalConfig = generalConfig;
            _mapper = mapper;
        }

        public async Task<List<ApplicantListDto>> GetApplicantList(Guid vacancyId)
        {
            return await _dbContext.VacancyStatuses.Include(x => x.ApplicantVacancy.Applicant).Include(x => x.ApplicantVacancy.Vacancy).Where(x => x.ApplicantVacancy.VacancyId == vacancyId && x.Status).AsNoTracking().Select(x => new ApplicantListDto
            {
                Id = x.Id,
                FullName = $"{x.ApplicantVacancy.Applicant.FirstName} {x.ApplicantVacancy.Applicant.MiddleName} {x.ApplicantVacancy.Applicant.LastName}",
                PhoneNumber = x.ApplicantVacancy.Applicant.PhoneNumber,
                ApplicantId = x.ApplicantVacancy.ApplicantId,
                ApplicantStatus = x.ApplicantStatus.ToString(),
                ApplicantType = x.ApplicantVacancy.Applicant.ApplicantType.ToString(),
                DateOfApplication = x.CreatedDate,
                Gender = x.ApplicantVacancy.Applicant.Gender.ToString(),
            }).ToListAsync();
        }

        public async Task<string> CheckApplicantProfile(Guid employeeId)
        {
            var currentEmployee = await _dbContext.Employees.FirstOrDefaultAsync(x => x.Id == employeeId);
            if(currentEmployee == null)
            {
                return "";
            }
            var currApplicant = await _dbContext.Applicants.FirstOrDefaultAsync(x => x.PhoneNumber == currentEmployee.PhoneNumber);
            if(currApplicant == null)
            {
                return "";
            }
            return currApplicant.Id.ToString();
        }

        public async Task<ResponseMessage> AddInternalApplicant(InternalApplicantDto internalApplicantDto)
        {

            var employee = await _dbContext.Employees.FirstOrDefaultAsync(x => x.Id == internalApplicantDto.EmployeeId);

            if (employee == null)
                return new ResponseMessage { Success = false, Message = "Error please Try Again" };

            var applicationExists = await _dbContext.ApplicantVacancies.AnyAsync(x => x.Applicant.EmployeeCode == employee.EmployeeCode);
            if (applicationExists)
            {
                return new ResponseMessage { Success = false, Message = "Applicant Already Exists" };
            }

            //var path = "";
            var Id = Guid.NewGuid();
            //if (internalApplicantDto.Photo != null)
            //    path = _generalConfig.UploadFiles(internalApplicantDto.Photo, Id.ToString(), "Applicant").Result.ToString();



            Applicant applicant = new Applicant()
            {
                Id = Id,
                CreatedDate = DateTime.Now,
                CreatedById = internalApplicantDto.CreatedById,
                ApplicantType = ApplicantType.INTERNAL,
                BirthDate = internalApplicantDto.BirthDate,
                FirstName = internalApplicantDto.FirstName,
                MiddleName = internalApplicantDto.MiddleName,
                LastName = internalApplicantDto.LastName,
                Gender =  Enum.Parse<Gender>(internalApplicantDto.Gender),
                Email = internalApplicantDto.Email,
                PhoneNumber = internalApplicantDto.PhoneNumber,
                NationalityId = internalApplicantDto.NationalityId,
                Photo = internalApplicantDto.ImagePath,
                Woreda = internalApplicantDto.Woreda,
                ZoneId = internalApplicantDto.ZoneId
            };

            await _dbContext.Applicants.AddAsync(applicant);
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage { Success = true, Message = "You have Applied Successfully", Data = applicant };
        }

        public async Task<ResponseMessage> AddEducationLevel(ApplicantEducationDto applicantEducation)
        {
            var educationExists = await _dbContext.ApplicantEducations.AnyAsync(x => x.ApplicantId == applicantEducation.ApplicantId && x.EducationalFieldId == x.EducationalFieldId && x.EducationalFieldId == x.EducationalLevelId);
            if (educationExists)
                return new ResponseMessage { Success = false, Message = "Education Field and Level Already Exists" };

            var path = "";
            var Id = Guid.NewGuid();
            if (applicantEducation.File != null)
                path = _generalConfig.UploadFiles(applicantEducation.File, Id.ToString(), "ApplicantEducation").Result.ToString();

            ApplicantEducation education = new ApplicantEducation()
            {
                Id = Id,
                EducationalFieldId = applicantEducation.EducationalFieldId,
                ApplicantId = applicantEducation.ApplicantId,
                EducationalLevelId = applicantEducation.EducationalLevelId,
                File = path,
                FromDate = applicantEducation.FromDate,
                GPA = applicantEducation.GPA,
                Institution = applicantEducation.Institution,
                Remark = applicantEducation.Remark,
                ToDate = applicantEducation.ToDate,
            };

            await _dbContext.ApplicantEducations.AddAsync(education);
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage { Success = true, Message = "Added Successfully" };
        }

        public async Task<ResponseMessage> AddWorkExperience(ApplicantWorkExperienceDto applicantWorkExperience)
        {
            var workExists = await _dbContext.ApplicantWorkExperiances.AnyAsync(x => x.ApplicantId == applicantWorkExperience.ApplicantId && x.Position == x.Position);
            if (workExists)
                return new ResponseMessage { Success = false, Message = "Work Experience Already Exists" };

            var path = "";
            var Id = Guid.NewGuid();
            if (applicantWorkExperience.File != null)
                path = _generalConfig.UploadFiles(applicantWorkExperience.File, Id.ToString(), "ApplicantWorkExperience").Result.ToString();

            ApplicantWorkExperiance workExperiacne = new ApplicantWorkExperiance()
            {
                Id = Id,
                ApplicantId = applicantWorkExperience.ApplicantId,
                File = path,
                FromDate = applicantWorkExperience.FromDate,
                ToDate = applicantWorkExperience.ToDate,
                Position = applicantWorkExperience.Position,
                Description = applicantWorkExperience.Description,
                OrganizationName = applicantWorkExperience.OrganizationName,
                Responsibility = applicantWorkExperience.Responsibility,
            };

            await _dbContext.ApplicantWorkExperiances.AddAsync(workExperiacne);
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage { Success = true, Message = "Added Successfully" };
        }

       
        public async Task<ResponseMessage> AddApplicantDocument(ApplicantVacancyDocumentDto applicantVacancy)
        {

            var path = "";
            var Id = Guid.NewGuid();
            if (applicantVacancy.DocumentPath != null)
                path = _generalConfig.UploadFiles(applicantVacancy.DocumentPath, Id.ToString(), "ApplicantVacancyDocument").Result.ToString();
            ApplcantDocuments doc = new ApplcantDocuments()
            {
                Id = Guid.NewGuid(),
                ApplicantVacnncyId = applicantVacancy.ApplicantVacnncyId,
                Description = applicantVacancy.Description,
                DocumentPath = path
            };

            await _dbContext.ApplcantDocuments.AddAsync(doc);
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage { Success = true, Message = "Added Successfully" };
        }

        public async Task<ResponseMessage> StartVacancy(Guid applicantId, Guid vacancyId)
        {
            var currentApplication = await _dbContext.ApplicantVacancies.FirstOrDefaultAsync(x => x.ApplicantId == applicantId && x.VacancyId == vacancyId);
            if (currentApplication != null)
                return new ResponseMessage { Success = false, Message = "You have already applied for this positon" };

            ApplicantVacancy applicantVacancy = new ApplicantVacancy()
            {
                Id = Guid.NewGuid(),
                ApplicantId = applicantId,
                CreatedDate = DateTime.Now,
                VacancyId = vacancyId
            };
            await _dbContext.ApplicantVacancies.AddAsync(applicantVacancy);

            await _dbContext.SaveChangesAsync();

            VacancyStatus vacancyStatus = new VacancyStatus()
            {
                Id = Guid.NewGuid(),
                ApplicantStatus = ApplicantStatus.PENDING,
                ApplicantVacancyId = applicantVacancy.Id,
                CreatedDate = DateTime.Now,
                Description = "Started The Application",
                IsNotificationSent = false,
                Status = true
            };

            await _dbContext.VacancyStatuses.AddAsync(vacancyStatus);

            await _dbContext.SaveChangesAsync();

            return new ResponseMessage { Success = true, Message = "Applied SuccessFully" };
        }

        public async Task<ResponseMessage> FinalizeApplication(Guid applicantId, Guid vacancyId)
        {
            var currentApplication = await _dbContext.ApplicantVacancies.FirstOrDefaultAsync(x => x.ApplicantId == applicantId && x.VacancyId == vacancyId);
            if (currentApplication == null)
                return new ResponseMessage { Success = false, Message = "Vacancy Could not be found" };


            var statusList = await _dbContext.VacancyStatuses.Where(x => x.ApplicantVacancyId == currentApplication.Id).ToListAsync();

            foreach(var item in statusList)
            {
                item.Status = false;
            }
            await _dbContext.SaveChangesAsync();

            VacancyStatus vacancyStatus = new VacancyStatus()
            {
                Id = Guid.NewGuid(),
                ApplicantStatus = ApplicantStatus.APPLIED,
                ApplicantVacancyId = currentApplication.Id,
                CreatedDate = DateTime.Now,
                Description = "Finalize Current Application",
                IsNotificationSent = false,
                Status = true
            };

            await _dbContext.VacancyStatuses.AddAsync(vacancyStatus);

            await _dbContext.SaveChangesAsync();

            return new ResponseMessage { Success = true, Message = "Applied SuccessFully" };
        }

        public async Task<ApplicantDetailDto> GetApplicantDetail(Guid applicantId, Guid vacancyId)
        {
            var currentApplicant = await _dbContext.Applicants.AsNoTracking().
                                          Include(x => x.Nationality).Include(x => x.Zone).
                                         ProjectTo<ApplicantDetailDto>(_mapper.ConfigurationProvider).FirstOrDefaultAsync(x => x.Id == applicantId);

            if (currentApplicant != null)
            {
                var appliedForVacancy = await _dbContext.VacancyStatuses.Include(x => x.ApplicantVacancy.Vacancy)
                                            .FirstOrDefaultAsync(x => x.ApplicantVacancy.ApplicantId == currentApplicant.Id && x.ApplicantVacancy.VacancyId == vacancyId && x.Status);
               if(appliedForVacancy != null)
                {
                    currentApplicant.AppliedForVacancy = true;
                    currentApplicant.ApplicantStatus = appliedForVacancy.ApplicantStatus.ToString();
                    currentApplicant.VacancyName = appliedForVacancy.ApplicantVacancy.Vacancy.VacancyName;
                    currentApplicant.ApplicantVacancyId = appliedForVacancy.ApplicantVacancyId;
                }
                return currentApplicant;
            }
              

            return new ApplicantDetailDto();

        }

        public async Task<List<ApplicantEducationListDto>> GetApplicantEducation(Guid applicantId)
        {
            return await _dbContext.ApplicantEducations.
                   AsNoTracking().Include(x => x.EducationalField).Include(x => x.EducationalLevel).Where(x => x.ApplicantId == applicantId)
                   .Select(x => new ApplicantEducationListDto
                   {
                       EducationalField = x.EducationalField.EducationalFieldName,
                       EducationalLevel = x.EducationalLevel.EducationalLevelName,
                       File = x.File,
                       FromDate = x.FromDate,
                       GPA = x.GPA,
                       Id = x.Id,
                       Institution = x.Institution,
                       Remark = x.Remark,
                       ToDate = x.ToDate
                   })
                   .ToListAsync();
        }

        public async Task<List<ApplicantWorkExperienceListDto>> GetApplicantExperience(Guid applicantId)
        {
            return await _dbContext.ApplicantWorkExperiances.
                   AsNoTracking().Where(x => x.ApplicantId == applicantId)
                   .Select(x => new ApplicantWorkExperienceListDto
                   {
                       Description = x.Description,
                       OrganizationName = x.OrganizationName,
                       Position = x.Position,
                       Responsibility = x.Responsibility,
                       File = x.File,
                       FromDate = x.FromDate,
                       Id = x.Id,
                       ToDate = x.ToDate
                   })
                   .ToListAsync();
        }

        public async Task<List<ApplicantVacancyList>> GetApplicantVacancies(Guid applicantId)
        {
            return await _dbContext.VacancyStatuses.
                   AsNoTracking().Include(x => x.ApplicantVacancy.Vacancy).Where(x => x.Status && x.ApplicantVacancy.ApplicantId == applicantId)
                   .Select(x => new ApplicantVacancyList
                   {
                       Id = x.Id,
                       ApplicantStatus = x.ApplicantStatus.ToString(),
                       VacancyName = x.ApplicantVacancy.Vacancy.VacancyName
                   })
                   .ToListAsync();
        }

        public async Task<List<ApplicantVacancyDocumentListDto>> GetApplicantDocument(Guid applicantVacancyId)
        {
            return await _dbContext.ApplcantDocuments.
                    AsNoTracking().Where(x => x.ApplicantVacnncyId == applicantVacancyId)
                    .Select(x => new ApplicantVacancyDocumentListDto
                    {
                        Id = x.Id,
                        Description = x.Description,
                        DocumentPath = x.DocumentPath
                    })
                    .ToListAsync();
        }

        public async Task<ResponseMessage> ChangeApplicantStatus(ApplicantProcessDto applicantProcess)
        {
            var currentApplication = await _dbContext.ApplicantVacancies.Include(x => x.Applicant).Include(x => x.Vacancy).FirstOrDefaultAsync(x => x.ApplicantId == applicantProcess.ApplicantId && x.VacancyId == applicantProcess.VacancyId);
            if (currentApplication == null)
                return new ResponseMessage { Success = false, Message = "Vacancy Could not be found" };
            
           

            var statusList = await _dbContext.VacancyStatuses.Include(x => x.ApplicantVacancy.Vacancy).Where(x => x.ApplicantVacancyId == currentApplication.Id && x.Status).ToListAsync();

            foreach (var item in statusList)
            {
                item.Status = false;
            }
            await _dbContext.SaveChangesAsync();

            VacancyStatus vacancyStatus = new VacancyStatus()
            {
                Id = Guid.NewGuid(),
                ApplicantStatus = applicantProcess.ApplicantStatus,
                ApplicantVacancyId = currentApplication.Id,
                ActionTakerId = applicantProcess.UserId,
                CreatedDate = DateTime.Now,
                HireDate = applicantProcess.HireDate,
                ScheduleDate = applicantProcess.ScheduleDate,
                Subject = applicantProcess.Subject,
                Description = applicantProcess.Description,
                IsNotificationSent = false,
                Status = true
            };

            await _dbContext.VacancyStatuses.AddAsync(vacancyStatus);

            await _dbContext.SaveChangesAsync();


            if (applicantProcess.ApplicantStatus == ApplicantStatus.HIRED)
            {
                if (currentApplication.Applicant.ApplicantType == ApplicantType.INTERNAL)
                {
                    var currentEmployee = await _dbContext.Employees.FirstOrDefaultAsync(x => x.EmployeeCode == currentApplication.Applicant.EmployeeCode);

                    if (currentEmployee == null)
                    {
                        return new ResponseMessage { Success = false, Message = "Employee Could not be found" };
                    }

                    var employeeStatus = await _dbContext.EmploymentDetails.Where(x => x.Rowstatus == RowStatus.ACTIVE && x.EmployeeId == currentEmployee.Id).ToListAsync();

                    employeeStatus.ForEach(x =>
                    {
                        x.Rowstatus = RowStatus.INACTIVE;
                    });
                    await _dbContext.SaveChangesAsync();

                    EmploymentDetail detail = new EmploymentDetail()
                    {
                        Id = Guid.NewGuid(),
                        CreatedById = applicantProcess.UserId,
                        CreatedDate = DateTime.Now,
                        DepartmentId = currentApplication.Vacancy.DepartmentId,
                        EmployeeId = currentEmployee.Id,
                        EmploymentStatus = EmploymentStatus.ACTIVE,
                        IsBlackListed = false,
                        PositionId = currentApplication.Vacancy.PositionId,
                        Rowstatus = RowStatus.ACTIVE,
                        StartDate = Convert.ToDateTime(applicantProcess.HireDate),
                        Remark = "Internal Application"
                    };

                    await _dbContext.EmploymentDetails.AddAsync(detail);
                    await _dbContext.SaveChangesAsync();
                }
                else
                {
                    var probationPeriod = await _dbContext.HrmSettings.FirstOrDefaultAsync(x => x.GeneralSetting == GeneralHrmSetting.PROBATIONPERIOD);
                    if (probationPeriod == null)
                        return new ResponseMessage { Success = false, Message = "Could Not Find Prohbation Period" };


                    var code = await _generalConfig.GenerateCode(GeneralCodeType.EMPLOYEEPREFIX);
                    EmployeeList employee = new EmployeeList
                    {
                        Id = Guid.NewGuid(),
                        CreatedDate = DateTime.Now,
                        CreatedById = applicantProcess.UserId,
                        EmployeeCode = code,
                        Woreda = currentApplication.Applicant.Woreda,
                        Email = currentApplication.Applicant.Email,
                        ZoneId = currentApplication.Applicant.ZoneId,
                        EmploymentStatus = EmploymentStatus.ACTIVE,
                        EmploymentType = EmploymentType.CONTRAT,
                        FirstName = currentApplication.Applicant.FirstName,
                        MiddleName = currentApplication.Applicant.MiddleName,
                        LastName = currentApplication.Applicant.LastName,
                        BirthDate = currentApplication.Applicant.BirthDate,
                        Gender = currentApplication.Applicant.Gender,
                        MaritalStatus = MaritalStatus.SINGLE,
                        PaymentType = PaymentType.PERMONTH,
                        EmploymentDate = Convert.ToDateTime(applicantProcess.HireDate),
                        ImagePath = currentApplication.Applicant.Photo,
                        PhoneNumber = currentApplication.Applicant.PhoneNumber,
                        Rowstatus = RowStatus.ACTIVE,
                    };
                    await _dbContext.Employees.AddAsync(employee);
                    await _dbContext.SaveChangesAsync();

                    EmploymentDetail employmentDetail = new EmploymentDetail()
                    {
                        Id = Guid.NewGuid(),
                        CreatedById = applicantProcess.UserId,
                        CreatedDate = DateTime.Now,
                        EmployeeId = employee.Id,
                        EmploymentStatus = EmploymentStatus.ACTIVE,
                        DepartmentId = currentApplication.Vacancy.DepartmentId,
                        PositionId = currentApplication.Vacancy.PositionId,
                        Remark = "Internal Application"

                    };
                    await _dbContext.EmploymentDetails.AddAsync(employmentDetail);
                    await _dbContext.SaveChangesAsync();

                    return new ResponseMessage { Success = true, Message = "Code of Employee is " + code + "Please Edit the rest of The fields!!"  };
                }
            }

            return new ResponseMessage { Success = true, Message = "Done SuccessFully" };
        }

      
    }
}
