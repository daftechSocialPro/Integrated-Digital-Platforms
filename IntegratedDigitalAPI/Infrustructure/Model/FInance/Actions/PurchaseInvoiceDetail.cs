using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Models.Inventory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.FInance.Actions
{
    public class PurchaseInvoiceDetail: WithIdModel
    {
        public Guid PurchaseInvoiceId { get; set; }
        public virtual PurchaseInvoice PurchaseInvoice { get; set; } = null!;
        public Guid ItemId { get; set; }
        public virtual Item Item { get; set; } = null!;
        public int Quantity { get; set; }
        public double Price { get; set; }
    }
}
