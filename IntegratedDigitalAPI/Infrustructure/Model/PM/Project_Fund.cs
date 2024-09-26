using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Model.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.PM
{
    public class Project_Fund : WithIdModel
    {
        public Guid ProjectId { get; set; }
        public virtual Project Project { get; set; }
        public Guid ProjectSourceFundId { get; set; }
        public virtual ProjectFundSource ProjectSourceFund { get; set; }
        public double Amount { get; set; }  
    }
}
