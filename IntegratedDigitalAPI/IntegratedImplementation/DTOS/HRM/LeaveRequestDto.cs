using IntegratedInfrustructure.Model.HRM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.DTOS.HRM
{
    public class LeaveRequestDto
    {
        public string CreatedById { get; set; } = null!;
        public Guid EmployeeId { get; set; }
        public Guid LeaveTypeId { get; set; }
        public DateTime FromDate { get; set; }
        public int TotalDate { get; set; }

        public string Reason { get; set; }
    }

    public class AddLeaveBalanceDto
    {
        public string CreatedById { get; set; } = null!;
        public Guid EmployeeId { get; set; }
        public int CurrentBalance { get; set; }
        public int PreviousBalance { get; set; }
        public DateTime? PreviousExpDate { get; set; }
        public int LeavesTaken { get; set; }
    }

    public class LeavesTakenDto
    {
        public Guid Id { get; set; }
        public string TypeOfLeave { get; set; } = null!;
        public string LeaveStatus { get; set; } = null!;
        public string FullName { get; set; } = null!;
        public Guid EmployeeId { get; set; } 
        public DateTime LeaveDate { get; set; }
        public DateTime BackToWorkOn { get; set; }

        public string Reason { get; set; } 
        public string Remark { get; set; }
    }

    public class AnnualLeaveBalanceDto
    {
        public int CurrentBalance { get; set; }
        public int PreviousBalance { get; set; }
        public DateTime? PreviousExpDate { get; set; }
        public int TotalBalance { get; set; }
        public int LeavesTaken { get; set; }
    }


}
