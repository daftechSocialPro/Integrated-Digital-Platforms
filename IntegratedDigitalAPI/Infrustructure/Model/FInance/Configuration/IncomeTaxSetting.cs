using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.FInance.Configuration
{
    public class IncomeTaxSetting: WithIdModel
    {
        public float StartingAmount { get; set; }
        public float EndingAmount { get; set; }
        public float Percent { get; set; }
        public float Deductable { get; set; }
        public float Withholding { get; set; }
        public DateTime EndDate { get; set; }
    }
}
