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
    public class InternalApplicantDto
    {
        public string CreatedById { get; set; } = null!;
        public string FirstName { get; set; } = null!;
        public string MiddleName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string ? ImagePath { get; set; }
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
        public Guid Id { get; set; }
        public Guid ApplicantId { get; set; }
        public Guid VacancyId { get; set; }
        public ApplicantStatus ApplicantStatus { get; set; }
    }

    public class ApplicantVacancyDocumentDto
    {
        public Guid Id { get; set; }
        public Guid ApplicantVacnncyId { get; set; }
        public IFormFile? DocumentPath { get; set; }
        public string? Description { get; set; }
    }
}
