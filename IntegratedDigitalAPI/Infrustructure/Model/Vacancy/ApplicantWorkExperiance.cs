using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.Vacancy
{
    public class ApplicantWorkExperiance
    {
        public Guid Id { get; set; }
        public virtual Applicant Applicant { get; set; } = null!;
        public Guid ApplicantId { get; set; }
        public string OrganizationName { get; set; } = null!;
        public string Position { get; set; } = null!;
        public DateTime FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public string? Description { get; set; }
        public string? Responsibility { get; set; }
        public string? File { get; set; }
    }
}
