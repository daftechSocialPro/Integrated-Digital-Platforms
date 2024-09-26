
using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Model.HRM;

namespace IntegratedInfrustructure.Models.PM
{
    public class EmployeesAssignedForActivities : WithIdModel 
    {

        public Guid EmployeeId { get; set; }
        public virtual EmployeeList Employee { get; set; } = null!;

        public Guid ActivityId { get; set; }
        public virtual Activity Activity { get; set; } = null!;


    }
}
