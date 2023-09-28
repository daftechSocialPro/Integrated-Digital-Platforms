using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedInfrustructure.Model.HRM
{
    public class EmployeeLeave:WithIdModel
    {
        public Guid EmployeeId { get; set; }
        public virtual EmployeeList Employee { get; set; } = null!;
        public Guid LeaveTypeId { get; set; }
        public virtual LeaveType LeaveType { get; set; } = null!;
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public int TotalDate { get; set; }
        public LeaveRequestStatus LeaveStatus { get; set; }
        public DateTime? ApprovedDate { get; set; }
        public Guid? ApproverEmployeeId { get; set; }

        public string ? Reason { get; set; }
        public string? Remark { get; set; }
        public virtual EmployeeList ApproverEmployee { get; set; } = null!;
    }
}
