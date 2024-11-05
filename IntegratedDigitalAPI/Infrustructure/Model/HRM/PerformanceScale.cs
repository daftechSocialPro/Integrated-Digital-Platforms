using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.HRM
{
    public class PerformanceScale : WithIdModel
    {
        public int Rate { get; set; }
        public string Definition { get; set; } = null!;
        public string Examples { get; set; } = null!;
    }
}
