using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.HRM
{
    public class BenefitList: WithIdModel
    {
        public string Name { get; set; } = null!;
        public string AmharicName { get; set; } = null!;
        public bool Taxable { get; set; }
        public bool AddOnContract { get; set; }
    }
}
