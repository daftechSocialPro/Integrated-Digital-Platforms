using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Model.FInance.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.FInance.Actions
{
    public class BegningBalance: WithIdModel
    {
        public Guid AccountingPeriodId { get; set; }
        public virtual AccountingPeriod AccountingPeriod { get; set; } = null!;
        public double TotalCredit { get; set; }
        public double TotalDebit { get; set; }
        public string Remark { get; set; } = null!;
    }
}
