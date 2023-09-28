using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.HRM
{
    public class EmployeeDevelopmentPlan: WithIdModel
    {
        public Guid EmployeePerformanceId { get; set; }
        public virtual EmployeePerformance EmployeePerformance { get; set; } = null!;
        public string SkillGap { get; set; } = null!;
        public string SudgestedTraining { get; set; } = null!;
        public string ModeOfDelivery { get; set; } = null!;
        public DateTime TrainingFrom { get; set; }
        public DateTime TrainingTo { get; set; }
        public string ExpectedOutCome { get; set;} = null!;
    }
}
