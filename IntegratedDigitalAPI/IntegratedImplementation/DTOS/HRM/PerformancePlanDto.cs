using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.DTOS.HRM
{
    public class PerformancePlanDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
        public double TotalTarget { get; set; }
        public List<PerformancePlanDetaiDto> PerformancePlanDetais { get; set; } = null!;
    }

    public class PerformancePlanDetaiDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
        public double Target { get; set; }
    }

    public class AddPerformancePlanDto
    {
        public string CreatedById { get; set; } = null!;
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
        public double TotalTarget { get; set; }
    }

    public class UpdateperformancePlanDto : AddPerformancePlanDto
    {
        [Required]
        public Guid Id { get; set; }
    }

    public class AddPerformancePlanDetailDto
    {
        public string CreatedById { get; set; } = null!;
        public Guid PerformancePlanId { get; set; }
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
        public double Target { get; set; }
    }

    public class UpdatePerfromancePlanDetailDto: AddPerformancePlanDetailDto
    {
        public Guid Id { get; set; }
    }
}
