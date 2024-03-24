using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Model.HRM;
using IntegratedInfrustructure.Models.Inventory;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.FInance.Actions
{
    public class PurchaseInvoice: WithIdModel
    {
        public PurchaseInvoice() 
        { 
            PurchaseInvoiceDetails = new HashSet<PurchaseInvoiceDetail>();
        }
        public Guid SupplierId { get; set; }
        public virtual Vendor Supplier { get; set; } = null!;
        public bool IsPurchaseRequested { get; set; }
        public Guid? PurchaseRequestId { get; set; }
        public virtual PurchaseRequest PurchaseRequest { get; set; } = null!;
        public string VocherNo { get; set; } = null!;
        public DateTime Date { get; set; }
        public bool IsApproved { get; set; }
        public Guid? ApprovedById { get; set; }
        public virtual EmployeeList EmployeeList { get; set; } = null!;
        public string? Remark { get; set; }

        [InverseProperty(nameof(PurchaseInvoiceDetail.PurchaseInvoice))]
        public ICollection<PurchaseInvoiceDetail> PurchaseInvoiceDetails { get; set; }  
    }
}
