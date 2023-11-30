using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.HRM
{
    public class OverTime: WithIdModel
    {
        public Guid EmployeeId { get; set; }
        public virtual EmployeeList Employee { get; set; } = null!;
        public double NormalOT { get; set; }
        public double NightOT { get; set; }
        public double DayoffOT { get; set; }
        public double HolidayOT { get; set; }
        public DateTime OverTimeDate { get; set; }
        public bool Approved { get; set; }
    }
}
