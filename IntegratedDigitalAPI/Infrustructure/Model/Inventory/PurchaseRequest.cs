using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Model.HRM;
using IntegratedInfrustructure.Model.PM;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Models.Inventory
{
    public class PurchaseRequest : WithIdModel
    {
        public PurchaseRequest()
        {
            PurchaseRequestLists = new HashSet<PurchaseRequestList>();
        }
        public string RequestNumber { get; set; } = null!;
        public Guid RequesterEmployeeId { get; set; }
        public virtual EmployeeList RequesterEmployee { get; set; } = null!;
        public bool IsStoreRequested { get; set; }
        public Guid? StoreRequestId { get; set; }
        public virtual StoreRequest StoreRequest { get; set; } = null!;
        public Guid? ProjectId { get; set; }
        public virtual Project Project { get; set; } = null!;

        [InverseProperty(nameof(PurchaseRequestList.PurchaseRequest))]
        public ICollection<PurchaseRequestList> PurchaseRequestLists { get; set; }

    }
}
