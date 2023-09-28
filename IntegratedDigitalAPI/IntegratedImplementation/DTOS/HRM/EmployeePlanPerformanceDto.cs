using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.DTOS.HRM
{
    public class EmployeePlanPerformanceDto
    {
        public string PerformancePlan { get; set; } = null!;
        public double Target { get; set; }
        public double GivenValue { get; set; }
        public string? Remark { get; set; }
        public string? Timing { get; set; }
    }
}
