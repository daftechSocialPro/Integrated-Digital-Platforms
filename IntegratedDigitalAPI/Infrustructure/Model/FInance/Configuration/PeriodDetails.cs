using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.FInance.Configuration
{
    public class PeriodDetails : WithIdModel
    {
        public Guid AccountingPeriodId { get; set; }
        public virtual AccountingPeriod AccountingPeriod { get; set; } = null!;
        public int PeriodNo { get; set; }
        public DateTime PeriodStart { get; set; }
        public DateTime PeriodEnd { get; set; }
    }
}
