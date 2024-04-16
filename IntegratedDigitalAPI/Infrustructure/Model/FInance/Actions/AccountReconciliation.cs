using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Model.Configuration;
using IntegratedInfrustructure.Model.FInance.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.FInance.Actions
{
    public  class AccountReconciliation : WithIdModel
    {
        public Guid BankListId { get; set; }
        public virtual BankList BankList { get; set; } = null!;
        public Guid PeriodId { get; set; }
        public virtual PeriodDetails Period { get; set; } = null!;
        public double Balance { get; set; } 
        public string? Remark { get; set; }
    }
}
