using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.HRM
{
    public class EmployeeShift: WithIdModel
    {
        public virtual EmployeeList Employee { get; set; } = null!;
        public Guid EmployeeId { get; set; }
        public virtual ShiftList ShiftList { get; set; } = null!;
        public Guid ShiftListId { get; set; }

    }
}
