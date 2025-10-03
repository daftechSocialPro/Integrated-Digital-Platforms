using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedReport.DataSet
{
    public class MonthlyAttReportDto
    {
        public string EmployeeId { get; set; } = null!;
        public string EmployeeCode { get; set; } = null!;
        public string EmployeeName { get; set; } = null!;
        public int FullDay { get; set; }
        public int NSB { get; set; }
        public int DayOff { get; set; }
        public int EP { get; set; }
        public int HalfDay { get; set; }
        public int LeaveDays { get; set; }
        public int Holiday { get; set; }
        public int Absent { get; set; }
        public double NormalOT { get; set; }
        public double NightOT { get; set; }
        public double DayOffOT { get; set; }
        public double HolidayOT { get; set; }
    }
}
