namespace IntegratedImplementation.DTOS.HRM
{
    public record HrmSettingDto
    {

        public Guid Id { get; set; }
        public string GeneralSetting { get; set; } = null!;
        public double value { get; set; }


    }
    public record HrmSettingPostDto
    {

        public string GeneralSetting { get; set; } = null!;
        public double value { get; set; }

        public string CreatedById { get; set; } = null!;
    }

    //public class SeveranceSettingDto
    //{
    //    public Guid? Id { get; set; }
    //    public Guid PositionId { get; set; }
    //    public string? PositionName { get; set; }
    //    public double Percentage { get; set; }
    //    public string CreatedById { get; set; }
    //    public RowStatus RowStatus { get; set; }
    //}
}
