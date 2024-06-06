using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Model.HRM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.FInance.Actions
{
    public class PayrollData : WithIdModel
    {
        public DateTime PayStart { get; set; }
        public DateTime PayEnd { get; set; }
        public int CalculatedCount { get; set; }
        public Guid? CheckedById { get; set; }
        public virtual EmployeeList CheckedBy { get; set; } = null!;
        public Guid? ApprovedById { get; set; }
        public virtual EmployeeList ApprovedBy { get; set; } = null!;
        public double TotalAmount { get; set; }
        public Guid? AutorizedById { get; set; }
        public virtual EmployeeList AutorizedBy { get; set; } = null!;
    }
}
