using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.HRM
{
    public class PerformanceSetting : WithIdModel
    {
        public string PerformanceMonth { get; set; } = null!;
        public int PerformanceIndex { get; set; }
        public int PerformanceStartDate { get; set; }
        public int PerformanceEndDate { get; set; }
    }
}
