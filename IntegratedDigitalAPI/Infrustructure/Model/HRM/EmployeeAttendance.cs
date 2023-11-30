using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.HRM
{
    public class EmployeeAttendance : WithIdModel
    {
        public TimeSpan CheckIn { get; set; }
        public TimeSpan CheckOut { get; set; }
        public DateTime AttendanceDate { get; set; }
        public string AttencanceType { get; set; } = null!;
        public TimeSpan TotalTime { get; set; }
        public Guid FingerPrintId { get; set; }
        public virtual EmployeeFingerPrint FingerPrint { get; set; } = null!;
        public bool TakeFromVacation { get; set; }
        public string? AbsentReason { get; set; }
    }
}
