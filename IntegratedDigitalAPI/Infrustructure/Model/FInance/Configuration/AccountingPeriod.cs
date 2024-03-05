using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedInfrustructure.Model.FInance.Configuration
{
    public class AccountingPeriod: WithIdModel
    {
        public AccountingPeriod() 
        { 
            PeriodDetail = new HashSet<PeriodDetails>();
        }
        public ACCOUNTINGPERIODTYPE AccountingPeriodType { get; set; }
        public CALANDERTYPE CalanderType { get; set; }
        public string Description { get; set; } = null!;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        [InverseProperty(nameof(PeriodDetails.AccountingPeriod))]
        public ICollection<PeriodDetails> PeriodDetail { get; set; }

    }
}
