
using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Model.HRM;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedInfrustructure.Models.PM
{
    public class ProjectTeamEmployees : WithIdModel
    {
        public Guid ProjectTeamId { get; set; }
        public virtual ProjectTeam ProjectTeam { get; set; } = null!;
        public Guid EmployeeId { get; set; }
        public virtual EmployeeList Employee { get; set; } = null!;
        public ProjectTeamEmployeeStatus ProjectTeamStatus { get; set; }
    }

}
