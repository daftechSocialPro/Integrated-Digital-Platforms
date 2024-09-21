using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.FInance.Actions
{
    public class PayeeDetailesPayment: WithIdModel
    {
        public Guid PaymentId { get; set; }
        public virtual Payment Payment { get; set; } = null!;
        public string FullName { get; set; } = null!;
        public string AccountNumber { get; set; } = null!;
        public double Ammount { get; set; }
        public string? Remark { get; set; }
    }
}
