using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.PM
{
    public class StrategicPlan:WithIdModel
    {
        public string Name { get;set; }

        public string Description { get;set; }  
    }
}
