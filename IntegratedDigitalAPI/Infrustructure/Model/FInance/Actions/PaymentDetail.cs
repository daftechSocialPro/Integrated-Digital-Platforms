using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Model.FInance.Configuration;
using IntegratedInfrustructure.Models.Inventory;

namespace IntegratedInfrustructure.Model.FInance.Actions
{
    public class PaymentDetail : WithIdModel
    {
        public Guid PaymentId { get; set; }
        public virtual Payment Payment { get; set; } = null!;
        public Guid? ItemId { get; set; }
        public virtual Item Item { get; set; } = null!;
        public Guid ChartOfAccountId { get; set; }
        public virtual ChartOfAccount ChartofAccount { get; set; } = null!;
        public string Description { get; set; } = null!;
        public double Quantity { get; set; }
        public double Price { get; set; }
        public double TotalPrice { get; set; }
        public string? Remark { get; set; }

    }
}
