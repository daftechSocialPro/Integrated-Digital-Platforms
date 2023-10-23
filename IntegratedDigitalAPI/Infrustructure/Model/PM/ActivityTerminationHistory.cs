

using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Model.HRM;
using System.ComponentModel;

namespace IntegratedInfrustructure.Models.PM
{
    public class ActivityTerminationHistories : WithIdModel
    {
        public Guid ActivityId { get; set; }
        public virtual Activity Activity { get; set; } = null!;

        public Guid FromEmployeeId { get; set; }
        public virtual EmployeeList FromEmployee { get; set; } = null!;

        public Guid? ToEmployeeId { get; set; }
        public virtual EmployeeList ToEmployee { get; set; } = null!;

        public Guid? ToProjectTeamId { get; set; }
        public virtual ProjectTeam TopProjectTeam { get; set; } = null!;

        public string TerminationReason { get; set; } = null!;

        public Guid ApprovedByDirectorId { get; set; }
        public virtual EmployeeList ApprovedByDirector { get; set; } = null!;

        public string DocumentPath { get; set; } = null!;

        [DefaultValue(false)]
        public Boolean Isapproved { get; set; }
        [DefaultValue(false)]
        public Boolean IsRejected { get; set; }

    }
}
