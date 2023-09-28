using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.HRM
{
    public class PerformancePlanDetail : WithIdModel
    {
        public Guid PerformancePlanId { get; set; }
        public virtual PerformancePlan PerformancePlan { get; set; } = null!;
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
        public double Target { get; set; }
    }
}
