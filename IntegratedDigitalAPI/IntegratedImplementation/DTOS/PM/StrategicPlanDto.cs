using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.DTOS.PM
{
    public record StrategicPlanPostDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string? CreatedById { get; set; } = null!;
    }

    public record StrategicPlanGetDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public bool RowStatus { get; set; }
     
    }
}
