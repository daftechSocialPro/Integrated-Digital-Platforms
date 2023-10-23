
using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Model.HRM;
using IntegratedInfrustructure.Model.PM;
using System.ComponentModel.DataAnnotations.Schema;

namespace IntegratedInfrustructure.Models.PM
{
    public class TaskMembers : WithIdModel
    {
        public Guid? TaskId { get; set; }
        public virtual Tasks Task { get; set; } = null!;
        public Guid? PlanId { get; set; }
        public virtual Project Plan { get; set; } = null!;
        public Guid? ActivityParentId { get; set; }
        public virtual ActivityParent ActivityParent { get; set; } = null!;
        public Guid EmployeeId { get; set; }
        public virtual EmployeeList Employee { get; set; } = null!;
    }
}
