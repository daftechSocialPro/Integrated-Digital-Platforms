using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedInfrustructure.Model.FInance.Configuration
{
    public class LedgerPostingAccount: WithIdModel
    {
        public JournalOption JournalOption { get; set; }
        public Guid ChartOfAccountId { get; set; }
        public ChartOfAccount ChartOfAccount { get; set; } = null!;
    }
}
