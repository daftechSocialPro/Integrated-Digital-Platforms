using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Model.FInance.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.FInance.Actions
{
    public class JournalVoucher: WithIdModel
    {
        public Guid ChartOfAccountId { get; set; }
        public virtual ChartOfAccount ChartOfAccount { get; set; } = null!;
        public Guid? SubsidiaryAccountId { get; set; }
        public virtual SubsidiaryAccount SubsidiaryAccount { get; set; } = null!;

    }
}
