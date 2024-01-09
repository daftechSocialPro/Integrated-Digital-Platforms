using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.DTOS.Inventory
{
    public class AddPurchaseRequestDto
    {
        public string CreatedById { get; set; } = null!;
        public string RequesterEmployeeId { get; set; } = null!;
        public bool IsStoreRequested { get; set; }
        public string? StoreRequestId { get; set; } 
        public List<AddPurchaseRequestListDto> RequestLists { get; set; } = null!;
    }

    public class AddPurchaseRequestListDto
    {
        public string ItemId { get; set; } = null!;
        public double Quantity { get; set; }
        public double SinglePrice { get; set; }
        public string MeasurementUnitId { get; set; } = null!;
    }


    public class PurchaseRequestListDto
    {
        public string Id { get; set; } = null!;
        public string RequesterEmployee { get; set; } = null!;
        public string ItemCode { get; set; } = null!;
        public string ItemName { get; set; } = null!;
        public string MeasurementUnitName { get; set; } = null!;
        public double Quantity { get; set; }
        public double SinglePrice { get; set; }

    }

    public class ApprovePurchaseRequestDto
    {
        public string Id { get; set; } = null!;
        public string ApproverEmployeeId { get; set; } = null!;
        public double APrrovedQuantity { get; set; }
    }
}
