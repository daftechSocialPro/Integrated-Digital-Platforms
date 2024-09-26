namespace IntegratedImplementation.DTOS.HRM
{
    public class PositionPostDto
    {
        public string PositionName { get; set; } = null!;
        public string AmharicName { get; set; } = null!;
        public bool HasSeverance { get; set; }
        public double? SeverancePercentage { get; set; }
        public string CreatedById { get; set; } = null!;
    }

    public class PositionGetDto
    {
        public string? Id { get; set; } = null!;
        public string PositionName { get; set; } = null!;
        public string AmharicName { get; set; } = null!;
        public bool HasSeverance { get; set; }
        public double? SeverancePercentage { get; set; }
    }
}
