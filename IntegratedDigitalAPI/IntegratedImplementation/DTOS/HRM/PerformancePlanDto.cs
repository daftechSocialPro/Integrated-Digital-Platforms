using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.DTOS.HRM
{
    public class PerformancePlanDto
    {
        public Guid Id { get; set; }
        public int Index { get; set; }
        public string Description { get; set; } = null!;
        public string TypeOfPerformance { get; set; } = null!;
        public List<string> Positions { get; set; } = null!;
    }

  

    public class AddPerformancePlanDto
    {
        public int Index { get; set; }
        public string CreatedById { get; set; } = null!;
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
        public List<Guid> PositionsId { get; set; } = null!;
        public TypeOfPerformance TypeOfPerformance { get; set; }
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
