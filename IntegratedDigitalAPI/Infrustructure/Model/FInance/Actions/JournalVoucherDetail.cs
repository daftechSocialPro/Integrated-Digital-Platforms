using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Model.FInance.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedInfrustructure.Model.FInance.Actions
{
    public class JournalVoucherDetail: WithIdModel
    {
        public Guid JournalVoucherId { get; set; }
        public virtual JournalVoucher JournalVoucher { get; set; } = null!;
        public Guid ChartOfAccountId { get; set; }
        public virtual ChartOfAccount ChartOfAccount { get; set; } = null!;
        public Guid? SubsidiaryAccountId { get; set; }
        public virtual SubsidiaryAccount SubsidiaryAccount { get; set; } = null!;
        public double Debit { get; set; }
        public double Credit { get; set; }
        public string Remark { get; set; } = null!;

    }
}
