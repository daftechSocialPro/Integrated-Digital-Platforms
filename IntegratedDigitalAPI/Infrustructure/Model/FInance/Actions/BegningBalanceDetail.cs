using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Model.FInance.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.FInance.Actions
{
    public class BegningBalanceDetail : WithIdModel
    {
        public Guid BegningBalanceId { get; set; }
        public virtual BegningBalance BegningBalance { get; set; } = null!;
        public Guid ChartOfAccountId { get; set; }
        public virtual ChartOfAccount ChartOfAccount { get; set; } = null!;
        public double Ammount { get; set; }
        public string Remark { get; set; } = null!;
    }
}
