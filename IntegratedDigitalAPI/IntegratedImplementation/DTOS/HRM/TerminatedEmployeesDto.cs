namespace IntegratedImplementation.DTOS.HRM
{
    public class TerminatedEmployeesDto
    {
        public Guid Id { get; set; }
        public string FullName { get; set; } = null!;
        public string Department { get; set; } = null!;
        public string Position { get; set; } = null!;
        public string TerminationReason { get; set; } = null!;
        public DateTime? TerminatedDate { get; set; }
        public string Remark { get; set; } = null!;

        public bool IsBlackListed { get; set; }

        public bool HasSeverance { get; set; }
        public double TotalSeveranceAmount { get; set; }
    }


    public class TerminateEmployee
    {
        public Guid Id { get; set; }
        public string Reason { get; set; } = null!;
        public bool BlackListed { get; set; }
    }


}
