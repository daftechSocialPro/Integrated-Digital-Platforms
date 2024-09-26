using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.HRM
{
    public class EmployeePerformancePlan: WithIdModel
    {
        public Guid EmployeePerformanceId { get; set; }
        public virtual EmployeePerformance EmployeePerformance { get; set; } = null!;
        public Guid PerformancePlanDetailId { get; set; }
        public virtual PerformancePlanDetail PerformancePlanDetail { get; set; } = null!;
        public double GivenValue { get; set; }
        public string? Remark { get; set; }
        public string? Timing { get; set; }
    }
}
