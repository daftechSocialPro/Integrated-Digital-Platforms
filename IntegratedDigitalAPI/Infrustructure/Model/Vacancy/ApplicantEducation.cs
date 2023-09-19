using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using IntegratedInfrustructure.Model.Configuration;

namespace IntegratedInfrustructure.Model.Vacancy
{
    public class ApplicantEducation
    {
        public Guid Id { get; set; }
        public virtual Applicant Applicant { get; set; } = null!;
        public Guid ApplicantId { get; set; }
        public virtual EducationalLevel EducationalLevel { get; set; } = null!;
        public Guid EducationalLevelId { get; set; }
        public virtual EducationalField EducationalField { get; set; } = null!;
        public Guid EducationalFieldId { get; set; }
        public string Institution { get; set; } = null!;
        public double? GPA { get; set; }
        public string? File { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public string? Remark { get; set; } 
    }
}
