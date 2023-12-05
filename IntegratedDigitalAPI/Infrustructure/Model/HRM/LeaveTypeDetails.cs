using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.HRM
{
    public class LeaveTypeDetails: WithIdModel
    {
        public Guid LeaveTypeId { get; set; }
        public virtual LeaveType LeaveType { get; set; } = null!;
        public int order { get; set; }
        public Guid TakeFromLeaveTypeId { get; set; }
        public virtual LeaveType TakeFromLeaveType { get; set; } = null!;

    }
}
