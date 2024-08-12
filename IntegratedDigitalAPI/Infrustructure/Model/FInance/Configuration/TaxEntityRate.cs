using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedInfrustructure.Model.FInance.Configuration
{
    public class TaxEntityRate: WithIdModel
    {
        public TaxEntityType TaxEntityType { get; set; }
        public double TaxRate { get; set; }
        public int Witholding { get; set; }
    }
}
