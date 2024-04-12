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
    public class Receipt: WithIdModel
    {
        public Guid BankId { get; set;}
        public virtual BankList Bank { get; set; } = null!;
        public Guid AccountingPeriodId { get; set; }
        public virtual PeriodDetails AccountingPeriod { get; set; } = null!;
        public string ReferenceNumber { get; set; } = null!;
        public string ReceiptNumber { get; set; } = null!;
        public DateTime Date { get; set; }
    }
}
