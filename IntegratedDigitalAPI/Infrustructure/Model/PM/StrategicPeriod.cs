using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.PM
{
    public class StrategicPeriod : WithIdModel
    {
        public StrategicPeriod()
        {
            StrategicPlans = new HashSet<StrategicPlan>();
        }

        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int DurationInYears { get; set; } = 5; // Default to 5 years for backward compatibility

        public virtual ICollection<StrategicPlan> StrategicPlans { get; set; }
    }
}

