using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.HRM
{
    public class LeaveBalance :WithIdModel
    {
        public Guid EmployeeId { get; set; }
        public virtual EmployeeList Employee { get; set; } = null!;
        public int CurrentBalance { get; set; }
        public int PreviousBalance { get; set; }
        public DateTime? PreviousExpDate { get; set; }
        public int TotalBalance { get; set; }
        public int LeavesTaken { get; set; }
    }
}
