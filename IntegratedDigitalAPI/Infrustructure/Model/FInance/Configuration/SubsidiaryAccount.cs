using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedInfrustructure.Model.FInance.Configuration
{
    public class SubsidiaryAccount: WithIdModel
    {
        public Guid ChartOfAccountId { get; set; }
        public virtual ChartOfAccount ChartOfAccount { get; set; } = null!;
        public string AccountNo { get; set; } = null!;
        public string Description { get; set; } = null!;
        public int Sequence { get; set; }
        public TypeOfAccount TypeOfAccount { get; set; }
    }
}
