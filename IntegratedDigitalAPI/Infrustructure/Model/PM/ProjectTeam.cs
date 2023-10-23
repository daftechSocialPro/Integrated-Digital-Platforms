

using IntegratedInfrustructure.Model.Authentication;

namespace IntegratedInfrustructure.Models.PM
{
    public class ProjectTeam : WithIdModel
    {
        public ProjectTeam()
        {
            Employees = new HashSet<ProjectTeamEmployees>();
        }
        public string ProjectTeamName { get; set; } = null!;        
        public virtual ICollection<ProjectTeamEmployees> Employees { get; set; }

    }
}
