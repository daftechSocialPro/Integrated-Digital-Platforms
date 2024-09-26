using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.HRM
{
    public class EmployeeSupervisors : WithIdModel
    {
        public Guid EmployeeId { get; set; }
        public virtual EmployeeList Employee { get; set; } = null!;
        public Guid SupervisorId { get; set; }
        public virtual EmployeeList Supervisor { get; set; } = null!;
        public Guid SecondSupervisorId { get; set; }
        public virtual EmployeeList SecondSupervisor { get; set; } = null!;
    }
}
