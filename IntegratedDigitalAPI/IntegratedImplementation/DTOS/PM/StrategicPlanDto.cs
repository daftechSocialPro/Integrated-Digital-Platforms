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
        public Guid StrategicPeriodId { get; set; }
        public string? CreatedById { get; set; } = null!;
    }

    public record StrategicPlanGetDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Guid StrategicPeriodId { get; set; }
        public string? StrategicPeriodName { get; set; }
        public bool RowStatus { get; set; }

    }

    public record StrategicPeriodPostDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public string? CreatedById { get; set; } = null!;
    }

    public record StrategicPeriodGetDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool RowStatus { get; set; }
    }



    public record StrageicPlanReportDto
    {
        public Guid StrategicPlanId { get; set; }

        public string? StrategicPlanName { get; set; }

        public float ActualProgress { get; set; }

        public float PlannedProgress { get; set; }

        public float ActualBudget { get; set; }
        public float PlannedBudget { get; set; }

    }


}
