using IntegratedInfrustructure.Model.Configuration;
using IntegratedInfrustructure.Model.Vacancy;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.DTOS.Vacancy
{
    public class ExternalApplicantDto
    {
        public Guid VacancyId { get; set; }
        public string FirstName { get; set; } = null!;
        public string MiddleName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;
        public string Gender { get; set; } = null!;
        public DateTime DateOfBirth { get; set; }
        public string EducationalLevel { get; set; } = null!;
        public string FieldOfStudy { get; set; } = null!;
        public string WorkExperience { get; set; } = null!;
        public string CoverLetter { get; set; } = null!;
        public IFormFile? Resume { get; set; }
        public IFormFile? AdditionalDocuments { get; set; }
    }

    public class InternalApplicantDto
    {
        public string CreatedById { get; set; } = null!;
        public Guid EmployeeId { get; set; }
        public string FirstName { get; set; } = null!;
        public string MiddleName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string? ImagePath { get; set; }
        public string Email { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;
        public string Gender { get; set; }
        public Guid NationalityId { get; set; }
        public DateTime BirthDate { get; set; }
        public string Woreda { get; set; } = null!;
        public Guid ZoneId { get; set; }
    }

    public class ApplicantEducationDto
    {
        public Guid Id { get; set; }
        public Guid ApplicantId { get; set; }
        public Guid EducationalLevelId { get; set; }
        public Guid EducationalFieldId { get; set; }
        public string Institution { get; set; } = null!;
        public DateTime FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public string? Remark { get; set; } 
        public double? GPA { get; set; }
        public IFormFile? File { get; set; } 
    }

    public class ApplicantWorkExperienceDto
    {
        public Guid Id { get; set; }
        public Guid ApplicantId { get; set; }
        public string OrganizationName { get; set; } = null!;
        public string Position { get; set; } = null!;
        public DateTime FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public string? Description { get; set; }
        public string? Responsibility { get; set; }
        public IFormFile? File { get; set; }
    }

    public class ApplyVacancyDto 
    {
        public string? CreatedById { get; set; }
        public Guid Id { get; set; }
        public Guid ApplicantId { get; set; }
        public Guid VacancyId { get; set; }
        public ApplicantStatus ApplicantStatus { get; set; }
        public string? Description { get; set; }
    }

    public class ApplicantVacancyDocumentDto
    {
        public Guid Id { get; set; }
        public Guid ApplicantVacnncyId { get; set; }
        public IFormFile? DocumentPath { get; set; }
        public string? Description { get; set; }
    }

    public class ApplicantProcessDto
    {
        public Guid ApplicantId { get; set; }
        public Guid VacancyId { get; set; }
        public string UserId { get; set; } = null!;
        public ApplicantStatus ApplicantStatus { get; set; }
        public bool SendEmail { get; set; }
        public string Subject { get; set; } = null!;
        public string Description { get; set; } = null!;
        public DateTime? HireDate { get; set; }
        public DateTime? ScheduleDate { get; set; }
    }
}
