using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Model.HRM;
using IntegratedInfrustructure.Model.PM;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.Configuration
{
    public class ProjectFundSource : WithIdModel
    {

        public ProjectFundSource()
        {
            ProjectFunds = new HashSet<Project_Fund>();
        }
        

        public string Name { get; set; }

        public double Budget { get; set; }

        public Guid FiscalYearId { get; set; }

        public virtual BudgetYear FiscalYear { get; set; }

        [InverseProperty(nameof(Project_Fund.ProjectSourceFund))]
        public ICollection<Project_Fund> ProjectFunds { get; set; }


    }
}
