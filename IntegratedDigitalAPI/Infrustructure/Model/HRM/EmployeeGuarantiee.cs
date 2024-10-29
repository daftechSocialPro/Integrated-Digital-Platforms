using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.HRM
{
    public class EmployeeGuarantiee: WithIdModel
    {
        public Guid EmployeeId { get; set; }
        public virtual EmployeeList Employee { get; set; } = null!;
        public string FullName { get; set; } = null!;
        public string AmharicFullName { get; set; } = null!;
        public string OrganizationName { get; set; } = null!;
        public string AmharicOrganizationName { get; set; } = null!;
        public string LetterNumber { get; set; } = null!;
        public DateTime LetterDate { get; set; }
        public string LetterPath { get; set; } = null!;
        public bool IsReturned { get; set; }
    }
}
