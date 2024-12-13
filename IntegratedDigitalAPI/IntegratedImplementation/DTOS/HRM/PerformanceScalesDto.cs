using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.DTOS.HRM
{
    public class PerformanceScalesDto
    {
        public Guid Id { get; set; }
        public int Rate { get; set; }
        public string Definition { get; set; } = null!;
        public string Examples { get; set; } = null!;
    }

    public class AddPerformanceScaleDto
    {
        public string CreatedById { get; set; } = null!;
        public int Rate { get; set; }
        public string Definition { get; set; } = null!;
        public string Examples { get; set; } = null!;

    }
}
