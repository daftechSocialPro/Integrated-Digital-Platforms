using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Models.Inventory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.Inventory
{
    public class PerformaDetail: WithIdModel
    {
        public Guid VendorId { get; set; }
        public virtual Vendor Vendor { get; set; } = null!;
        public Guid PurchaseRequestListId { get; set; }
        public virtual PurchaseRequestList PurchaseRequestList { get; set; } = null!;
        public string Description { get; set; } = null!;
        public double SinglePrice { get; set; } 
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public string? Remark { get; set; }
        public bool IsWinner { get; set; }
    }
}
