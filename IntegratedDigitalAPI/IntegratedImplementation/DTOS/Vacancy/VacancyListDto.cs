using IntegratedInfrustructure.Model.Configuration;
using IntegratedInfrustructure.Model.HRM;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.DTOS.Vacancy
{
    public class VacancyListDto
    {
        public Guid Id { get; set; }
        public string VacancyName { get; set; } = null!;
        public string Position { get; set; } = null!;
        public string Department { get; set; } = null!;
        public string VaccancyDescription { get; set; } = null!;
        public string EducationalLevel { get; set; } = null!;
        public string EducationalField { get; set; } = null!;
        public int Quantity { get; set; }
        public string EmploymentType { get; set; } = null!;
        public DateTime VaccancyStartDate { get; set; }
        public DateTime VaccancyEndDate { get; set; }
        public bool IsApproved { get; set; }
        public double? GPA { get; set; }
        public string VacancyType { get; set; } = null!;
    }

    public class AddVacancyDto
    {
        public string VacancyName { get; set; } = null!;
        public string CreatedById { get; set; } = null!;
        public Guid PositionId { get; set; }
        public Guid DepartmentId { get; set; }
        public string VaccancyDescription { get; set; } = null!;
        public Guid EducationalLevelId { get; set; }
        public Guid EducationalFieldId { get; set; }
        public int Quantity { get; set; }
        public EmploymentType EmploymentType { get; set; }
        public DateTime VaccancyStartDate { get; set; }
        public DateTime VaccancyEndDate { get; set; }
        public double? GPA { get; set; }
        public VacancyType VacancyType { get; set; }
    }

    public class UpdateVacancyDto: AddVacancyDto
    {
        [Required]
        public Guid Id { get; set; }
    }

    public class AddVacancyDocumentDto
    {
        public Guid VacancyId { get; set; }
        public string CreatedById { get; set; } = null!;
        public string DocuemntName { get; set; } = null!;
        public IFormFile DocumentPath { get; set; } = null!;
    }

    public class VacancyDocumentsDto
    {
        public Guid Id { get; set; }
        public string DocuemntName { get; set; } = null!;
        public string DocumentPath { get; set; } = null!;
    }

}
