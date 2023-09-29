using IntegratedInfrustructure.Model.HRM;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.DTOS.HRM
{
    public class EmploeePerformanceDto
    {
        public Guid PerformanceId { get; set; }
        public string PlanStatus { get; set; } = null!;
        public string IndividualDevt { get; set; } = null!;
        public string RequiredSupport { get; set; } = null!;
        public int MonthIndex { get; set; }
        public bool ApprovedBySecondSupervisor { get; set; }
        public string ApproverEmployee { get; set; } = null!;
    }

    public class EmployeePerformancePlanDto
    {
        public Guid PlanId { get; set; }
        public string PerfomancePlan { get; set; } = null!;
        public double Target { get; set; }
        public double PerformanceIndicators { get; set; }
        public string Timing { get; set; } = null!;
        public List<EmployeePerformancePlanDetailDto> PerfomanceDetail { get; set; } = null!;
    }

    public class EmployeePerformancePlanDetailDto
    {
        public Guid PlanDetailId { get; set; }
        public string PerformacePlan { get; set; } = null!;
        public double Target { get; set; }
        public double PerformanceIndicators { get; set; }
        public string? Timing { get; set; } = null!;

    }
}
