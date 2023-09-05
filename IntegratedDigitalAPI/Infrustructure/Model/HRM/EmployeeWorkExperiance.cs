using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Model.Vacancy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.HRM
{
    public class EmployeeWorkExperiance:WithIdModel
    {
        public virtual EmployeeList Employee { get; set; } = null!;
        public Guid EmployeeId { get; set; }

        public string OrganizationName { get; set; } = null!;
        public string Position { get; set; } = null!;

        public DateTime FromDate { get; set; }
        public DateTime? ToDate { get; set; }

        public string? Description { get; set; }
        public string? Responsibility { get; set; }
    }
}
