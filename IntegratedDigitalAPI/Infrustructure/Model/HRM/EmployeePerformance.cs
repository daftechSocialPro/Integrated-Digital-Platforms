using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedInfrustructure.Model.HRM
{
    public class EmployeePerformance : WithIdModel
    {
        public Guid EmployeeId { get; set; }
        public virtual EmployeeList Employee { get; set; } = null!;
        public int Index { get; set; }
        public PerformanceStatus PlanStatus { get; set; }
        public PerformanceStatus IndividualDevt { get; set; }
        public PerformanceStatus RequiredSupport { get; set; }
        public int MonthIndex { get; set; }
        public Guid? ApproverId { get; set; }
        public virtual EmployeeList Approver { get; set; } = null!;
        public bool ApprovedBySecondSupervisor { get; set; }

    }
}
