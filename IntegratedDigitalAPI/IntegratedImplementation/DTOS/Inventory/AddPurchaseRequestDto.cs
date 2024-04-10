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
        public string? ProjectId { get; set; }
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
    }


    public class ApprovedPurchaseRequestsDto
    {
        public Guid Id { get; set; }
        public string RequestNumber { get; set; } = null!;
        public string ItemName { get; set; } = null!;
        public double Quantitiy { get; set; }
        public string ApproverEmployee { get; set; } = null!;

        public List<ApprovedPerformaDetailDto> PerformaDetails { get; set; } = null!;
        
    }

    public class ApprovedPerformaDetailDto
    {
        public Guid Id { get; set; }
        public string VendorName { get; set; } = null!;
        public string Description { get; set; } = null!;
        public double SinglePrice { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
    }


    public class AddPerformaDto
    {
        public Guid PurchaseRequestListId { get; set; }
        public Guid VendorId { get; set; }
        public string CreatedById { get; set; } = null!;
        public string Description { get; set; } = null!;
        public double SinglePrice { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }

    }


    public class ApprovePerformaDto
    {
        public Guid VendorId { get; set; }
        public Guid EmployeeId { get; set; }
        public Guid PurchaseRequestListId { get; set; }
        public double ApprovedQuantity { get; set; }
        public string? Remark { get; set; } 

    }

}
