using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.HRM
{
    public class EmployeeSupport : WithIdModel
    {
        public Guid EmployeePerformanceId { get; set; }
        public virtual EmployeePerformance EmployeePerformance { get; set; } = null!;
        public string RequiredSupport { get; set; } = null!;
    }
}
