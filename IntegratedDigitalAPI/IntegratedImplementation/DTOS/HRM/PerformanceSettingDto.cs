using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.DTOS.HRM
{
    public class PerformanceSettingDto
    {
        public Guid? Id { get; set; }
        public string? CreatedById { get; set; }
        public string PerformanceMonth { get; set; } = null!;
        public int PerformanceIndex { get; set; }
        public int PerformanceStartDate { get; set; }
        public int PerformanceEndDate { get; set; }
    }


}
