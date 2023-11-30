using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.DTOS.HRM
{
    public class PositionPostDto
    {
        public string PositionName { get; set; } = null!;
        public string AmharicName { get; set; } = null!;
        public string CreatedById { get; set; } = null!;
    }

    public class PositionGetDto
    {
        public string? Id { get; set; } = null!;
        public string PositionName { get; set; } = null!;
        public string AmharicName { get; set; } = null!;
    }
}
