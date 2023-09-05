using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Model.Configuration;
using IntegratedInfrustructure.Model.Vacancy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.HRM
{
    public class EmployeeEducation :WithIdModel
    {

        public virtual EmployeeList Employee { get; set; } = null!;
        public Guid EmployeeId { get; set; }

        public virtual EducationalLevel EducationalLevel { get; set; } = null!;
        public Guid EducationalLevelId { get; set; }

        public virtual EducationalField EducationalField { get; set; } = null!;
        public Guid EducationalFieldId { get; set; }

        public string Institution { get; set; } = null!;     

        public DateTime FromDate { get; set; }
        public DateTime? ToDate { get; set; }

        public string? Remark { get; set; }

    }
}
