using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.HRM
{
    public class PerformancePlan: WithIdModel
    {
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
        public double TotalTarget { get; set; }
    }
}
