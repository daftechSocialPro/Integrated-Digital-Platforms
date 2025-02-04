﻿using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Model.FInance.Configuration;
using IntegratedInfrustructure.Model.PM;
using IntegratedInfrustructure.Models.Inventory;

namespace IntegratedInfrustructure.Model.FInance.Actions
{
    public class ReceiptDetail : WithIdModel
    {
        public Guid ReceiptId { get; set; }
        public virtual Receipt Receipt { get; set; } = null!;
        public Guid ChartOfAccountId { get; set; }
        public virtual ChartOfAccount ChartOfAccount { get; set; } = null!;
        public Guid SubsidiaryAccountId { get; set; }
        public virtual SubsidiaryAccount SubsidiaryAccount { get; set; }
        public Guid? ItemId { get; set; }
        public virtual Item Item { get; set; } = null!;
        public string Description { get; set; } = null!;
        public double UnitPrice { get; set; }
        public double Quantity { get; set; }
        public bool IsTaxable { get; set; }
        public Guid? ProjectId { get; set; }
        public virtual Project Project { get; set; } = null!;
    }
}
