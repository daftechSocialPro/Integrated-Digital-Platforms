using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.HRM
{
    public class OnFieldEmployeeList: WithIdModel
    {
        public Guid EmployeeId { get; set; }
        public virtual EmployeeList EmployeeList { get; set; } = null!;
        public DateTime FieldDate { get; set; }
        public DateTime ReturnDate { get; set; }
        public Guid ApprovedById { get; set; }
        public virtual EmployeeList ApprovedBy { get; set; } = null!;

    }
}
