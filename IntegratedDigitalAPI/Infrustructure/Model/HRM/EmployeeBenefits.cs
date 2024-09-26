using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedInfrustructure.Model.HRM
{
    public class EmployeeBenefits: WithIdModel
    {
        public Guid EmployeeId { get; set; }
        public virtual EmployeeList Employee { get; set; } = null!;
        public Guid BenefitId { get; set; }
        public virtual BenefitList Benefit { get; set; } = null!;
        public TypeOfBenefit TypeOfBenefit { get; set; }
        public bool Recursive { get; set; }
        public DateTime? AllowanceEndDate { get; set; }
        public double Amount { get; set; }
        public bool Taxable { get; set; }
    }
}
