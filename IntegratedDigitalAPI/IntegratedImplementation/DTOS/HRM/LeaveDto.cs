using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.DTOS.HRM
{
    public record  LeaveTypePostDto
    {
        public string Name { get; set; } = null!;

        public string LeaveCategory { get; set; } = null!;

        public int MinDate { get; set; }

        public int? MaxDate { get; set; }

        public int? IncrementValue { get; set; }

        public string CreatedById { get; set; } = null!;
    }
    public record LeaveTypeGetDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;

        public string LeaveCategory { get; set; } = null!;

        public int MinDate { get; set; }

        public int? MaxDate { get; set; }

        public int? IncrementValue { get; set; }
    }
}
