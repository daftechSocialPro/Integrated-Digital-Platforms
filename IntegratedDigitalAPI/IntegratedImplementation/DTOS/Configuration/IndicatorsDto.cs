namespace IntegratedImplementation.DTOS.Configuration
{
    public record IndicatorGetDto
    {
        public Guid? Id { get; set; }
        public string Name { get; set; } = null!;
        public string? StratgicPlan { get; set; } 

        public Guid StratgicPlanId { get; set; }
        public string Type { get; set; } = null!;
        
    }

    public record IndicatorPostDto
    {
        public string Name { get; set; } = null!;
        public Guid StratgicPlanId { get; set; } 
        public string Type { get; set; } = null!;
        public string CreatedById { get; set; } = null!;
    }


}
