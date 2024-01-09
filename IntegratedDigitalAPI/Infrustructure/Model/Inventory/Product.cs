using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Model.Inventory;
using IntegratedInfrustructure.Models.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Models.Inventory
{
    public class Product: WithIdModel
    {
        public Guid ItemId { get; set; }
        public virtual Item Item { get; set; } = null!;
        public string ItemDetailName { get; set; } = null!;
        public string DetailCode { get; set; } = null!;
        public bool IsPurchaseRequest { get; set; }
        public Guid? PurchaseRequestId { get; set; }
        public virtual PurchaseRequest PurchaseRequest { get; set; } = null!;
        public double SinglePrice { get; set; }
        public double Quantiy { get; set; }
        public Guid MeasurementUnitId { get; set; }
        public virtual MeasurmentUnit MeasurementUnit { get; set; } = null!;
        public DateTime RecivingDateTime { get; set; }
        public DateTime? ManufactureDate { get; set; }
        public DateTime? ExpireDateTime { get; set; }   
        public Guid VendorId { get; set; }
        public virtual Vendor Vendor { get; set; } = null!;
        public string? RowName { get; set; } = null!;
        public string? ColumnName { get; set; } = null!;
        public string? Description { get; set; } = null!;
        public double RemainingQuantity { get; set; }
        public int Cartoon { get; set; }
        public int Packet { get; set; }
    }
}
