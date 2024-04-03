using IntegratedInfrustructure.Models.Inventory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.DTOS.Finance.Action
{
    public class PurchaseInvoiceDto
    {
        public string Supplier { get; set; } = null!;
        public bool IsPurchaseRequested { get; set; }   
        public string PurchaseRequestNo { get; set; } = null!;
        public string VocherNo { get; set; } = null!;
        public DateTime Date { get; set; }
        public string? Remark { get; set; } 
        public bool IsApproved { get; set; }
        public string ApproverEmployee { get; set; } = null!;
        public List<PurchaseInvoiceDetailDto> PurchaseInvoiceDetails { get; set; } = null!;
    }

    public class PurchaseInvoiceDetailDto
    {
        public string ItemNo { get; set; } = null!;
        public string ItemName { get; set; } = null!;
        public int Quantity { get; set; }
        public double UnitPrice { get; set; }
        public double TotalPrice { get; set; }
    }


    public class AddPurchaseInvoiceDto
    {
        public Guid SupplierId { get; set; }
        public bool IsPurchaseRequested { get; set; }
        public Guid? PurchaseRequestId { get; set; }
        public string VocherNo { get; set; } = null!;
        public DateTime Date { get; set; }
        public string? Remark { get; set; }
        public string CreatedById { get; set; } = null!;
        public List<AddPurchaseInvoiceDetailDto> PurchaseInvoiceDetails { get; set; } = null!;
    }

    public class AddPurchaseInvoiceDetailDto
    {
        public Guid ItemId { get; set; }
        public int Quantity { get; set; }
        public double UnitPrice { get; set; }
    }
}
