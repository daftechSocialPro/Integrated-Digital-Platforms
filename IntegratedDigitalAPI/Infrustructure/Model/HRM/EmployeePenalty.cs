using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedInfrustructure.Model.HRM
{
    public class EmployeePenalty: WithIdModel
    {
        public Guid EmployeeId { get; set; }
        public virtual EmployeeList Employee { get; set; } = null!;
        public PenaltyType PenaltyType { get; set; }
        public DateTime PenaltyDate { get; set; }
        public double Amount { get; set; }
        public double TotNumber { get; set; }
        public bool FromSalary { get; set; }
        public bool Recursive { get; set; }
        public DateTime? PenalityendDate { get; set; }
        public string Remark { get; set; } = null!;
    }
}
