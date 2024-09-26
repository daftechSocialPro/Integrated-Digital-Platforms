using IntegratedInfrustructure.Model.Configuration;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.DTOS.Vacancy
{
    public class ApplicantListDto
    {
        public Guid Id { get; set; }
        public string FullName { get; set; } = null!;
        public string Gender { get; set; } = null!;
        public DateTime DateOfApplication { get; set; }
        public string PhoneNumber { get; set; } = null!;
        public string ApplicantStatus { get; set; } = null!;
        public Guid ApplicantId { get; set; }
        public string ApplicantType { get; set; } = null!;
    }

    public class ApplicantDetailDto
    {
        public Guid Id { get; set; }
        public string FullName { get; set; } = null!;
        public string Photo { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;
        public string Gender { get; set; } = null!;
        public string NationalityName { get; set; } = null!;
        public DateTime BirthDate { get; set; }
        public string Woreda { get; set; } = null!;
        public string ZoneName { get; set; } = null!;
        public string ApplicantType { get; set; } = null!;
        public bool AppliedForVacancy { get; set; }
        public string? VacancyName { get; set; }
        public string? ApplicantStatus { get; set; } = null!;
        public Guid? ApplicantVacancyId { get; set; } = null!;
    }

    public class ApplicantEducationListDto
    {
        public Guid Id { get; set; }
        public string EducationalLevel { get; set; } = null!;
        public string EducationalField { get; set; } = null!;
        public string Institution { get; set; } = null!;
        public DateTime FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public string? Remark { get; set; }
        public double? GPA { get; set; }
        public string? File { get; set; }
    }


    public class ApplicantWorkExperienceListDto
    {
        public Guid Id { get; set; }
        public string OrganizationName { get; set; } = null!;
        public string Position { get; set; } = null!;
        public DateTime FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public string? Description { get; set; }
        public string? Responsibility { get; set; }
        public string? File { get; set; }
    }

    public class ApplicantVacancyList
    {
        public Guid Id { get; set; }
        public string VacancyName { get; set; } = null!;
        public string ApplicantStatus { get; set; } = null!;
    }

    public class ApplicantVacancyDocumentListDto
    {
        public Guid Id { get; set; }
        public string? DocumentPath { get; set; }
        public string? Description { get; set; }
    }



}
