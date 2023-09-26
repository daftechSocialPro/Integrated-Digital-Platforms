using AutoMapper;
using AutoMapper.QueryableExtensions;
using Implementation.Helper;
using IntegratedImplementation.DTOS.HRM;
using IntegratedImplementation.DTOS.Vacancy;
using IntegratedImplementation.Interfaces.Configuration;
using IntegratedImplementation.Interfaces.Vacancy;
using IntegratedInfrustructure.Data;
using IntegratedInfrustructure.Model.Vacancy;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
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
            return await _dbContext.ApplicantVacancies.Include(x => x.Applicant).Include(x => x.Vacancy).Where(x => x.VacancyId == vacancyId).AsNoTracking().Select(x => new ApplicantListDto
            {
                Id = x.Id,
                ApplicantStatus = x.ApplicantStatus.ToString(),
                FullName = $"{x.Applicant.FirstName} {x.Applicant.MiddleName} {x.Applicant.LastName}",
                Photo = x.Applicant.Photo,
                VacancyName = x.Vacancy.VacancyName
            }).ToListAsync();
        }

        public async Task<ResponseMessage> AddInternalApplicant(InternalApplicantDto internalApplicantDto)
        {
            var applicationExists = await _dbContext.Applicants.AnyAsync(x => x.PhoneNumber == internalApplicantDto.PhoneNumber);
            if (applicationExists)
            {
                return new ResponseMessage { Success = false, Message = "You have Already Applied for the Position" };
            }

            var path = "";
            var Id = Guid.NewGuid();
            if (internalApplicantDto.Photo != null)
                path = _generalConfig.UploadFiles(internalApplicantDto.Photo, Id.ToString(), "Applicant").Result.ToString();



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
                Gender = internalApplicantDto.Gender,
                Email = internalApplicantDto.Email,
                PhoneNumber = internalApplicantDto.PhoneNumber,
                NationalityId = internalApplicantDto.NationalityId,
                Photo = path,
                Woreda = internalApplicantDto.Woreda,
                ZoneId = internalApplicantDto.ZoneId
            };

            await _dbContext.Applicants.AddAsync(applicant);
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage { Success = true, Message = "You have Applied Successfully" };
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

        public async Task<ResponseMessage> ApplyForVanacncy(ApplyVacancyDto applyVacancy)
        {
            var vacancyExists = await _dbContext.ApplicantVacancies.AnyAsync(x => x.VacancyId == applyVacancy.VacancyId && x.ApplicantId == applyVacancy.ApplicantId);
            if (vacancyExists)
                return new ResponseMessage { Success = false, Message = "Already Applied for this Vacancy" };

            ApplicantVacancy applicantVacancy = new ApplicantVacancy()
            {
                Id = Guid.NewGuid(),
                CreatedDate = DateTime.Now,
                ApplicantId = applyVacancy.ApplicantId,
                VacancyId = applyVacancy.VacancyId,
                ApplicantStatus = ApplicantStatus.PENDING,
            };

            await _dbContext.ApplicantVacancies.AddAsync(applicantVacancy);
            await _dbContext.SaveChangesAsync();
            return new ResponseMessage { Success = true, Message = "Applied Success Fully" };
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

        public async Task<ResponseMessage> FinalizeApplication(Guid applicantId, Guid vacancyId)
        {
            var currentApplication = await _dbContext.ApplicantVacancies.FirstOrDefaultAsync(x => x.ApplicantId == applicantId && x.VacancyId == vacancyId);
            if (currentApplication == null)
                return new ResponseMessage { Success = false, Message = "Vacancy Could not be found" };

            currentApplication.ApplicantStatus = ApplicantStatus.APPLIED;

            await _dbContext.SaveChangesAsync();

            return new ResponseMessage { Success = true, Message = "Saved SuccessFully" };
        }

        public async Task<ApplicantDetailDto> GetApplicantDetail(Guid applicantId)
        {
            var currentApplicant = await _dbContext.Applicants.AsNoTracking().
                                          Include(x => x.Nationality).Include(x => x.Zone).
                                    ProjectTo<ApplicantDetailDto>(_mapper.ConfigurationProvider).FirstOrDefaultAsync(x => x.Id == applicantId);

            if (currentApplicant != null)
                return currentApplicant;

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
            return await _dbContext.ApplicantVacancies.
                   AsNoTracking().Include(x => x.Vacancy).Where(x => x.ApplicantId == applicantId)
                   .Select(x => new ApplicantVacancyList
                   {
                       Id = x.Id,
                       ApplicantStatus = x.ApplicantStatus.ToString(),
                       VacancyName = x.Vacancy.VacancyName
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
    }
}
