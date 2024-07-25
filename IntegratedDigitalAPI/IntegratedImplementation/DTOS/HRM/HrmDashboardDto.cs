namespace IntegratedImplementation.DTOS.HRM
{
    public class HrmDashboardDto
    {
        public int ActiveEmployees { get; set; }
        public int TerminatedEmployees { get; set; }
        public int ResignedEmployees { get; set; }
        public int MaleEmployees { get; set; }
        public int FemaleEmployees { get; set; }
        public int ActiveVacancies { get; set; }
        public int Applicants { get; set; }
        public List<soonTerminateDto> soonTerminate { get; set; }


    }

    public class soonTerminateDto
    {
        public string EmployeeName { get; set; }
        public int RemainingDays { get; set; }
        public string EmploymentType { get; set; }
        public DateTime EmploymentDate { get; set; }

    }
}
