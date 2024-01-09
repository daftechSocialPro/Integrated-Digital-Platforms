
namespace IntegratedDigitalAPI.DTOS.PM
{
    public class ActivityDetailDto
    {
        public string ActivityDescription { get; set; } = null!;
        public bool HasActivity { get; set; }
        public Guid TaskId { get; set; }

        public Guid ZoneId { get; set; }

        public string? Woreda { get; set; }

       
        public string? ActivityNumber { get; set; }

        public Guid CreatedBy { get; set; }
        public List<SubActivityDetailDto>? ActivityDetails { get; set; }
    }

    public class SubActivityDetailDto
    {
        public Guid CreatedBy { get; set; }
        public string SubActivityDesctiption { get; set; } = null!;
        public string? ActivityNumber { get; set; }
        public string StartDate { get; set; } = null!;
        public string EndDate { get; set; } = null!;
        public float PlannedBudget { get; set; }
        public bool IsTraining { get; set; }


        public int ActivityType { get; set; }
        public float OfficeWork { get; set; }
        public float FieldWork { get; set; }
        public Guid IndicatorId { get; set; }
        public float PreviousPerformance { get; set; }
        public float Goal { get; set; }
        public Guid? TeamId { get; set; }

        public Guid? CommiteeId { get; set; }
        public Guid? PlanId { get; set; }
        public Guid? TaskId { get; set; }
        public string[]? Employees { get; set; }

        public Guid ZoneId { get; set; }
        public string Woreda { get; set; }
        public Guid StrategicPlanId { get; set; }

        public double Longtude { get; set; }
        public double Latitude { get; set; }


    }
}
