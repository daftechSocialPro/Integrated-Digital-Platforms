



using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.DTOS.Inventory
{

    public class AddStoreRequestDto
    {
        public string CreatedById { get; set; } = null!;
        public string RequesterEmployeeId { get; set; } = null!;
        public string? ProjectId { get; set; } = null!;
        public List<AddStoreRequestListDto> RequestLists { get; set; } = null!;
    }

    public class AddStoreRequestListDto
    {
        public string ItemId { get; set; } = null!;
        public double Quantity { get; set; }
        public string MeasurementUnitId { get; set; } = null!;
    }

    public class StoreRequestItems
    {
        public string ItemId { get; set; } = null!;
        public string ItemName { get; set; } = null!;
        public double RemainingQuantity { get; set; }
        public double StoreApprovedQuantity { get; set; }
        public string MeasurementUnitName { get; set; } = null!;

        public List<StoreRequestLists> StoreRequests { get; set; } = null!;

    }
    public class StoreRequestLists
    {
        public string Id { get; set; } = null!;
        public double ToSIUnit { get; set; } 
        public string RequesterEmployee { get; set; } = null!;
        public double Quantity { get; set; }
        public string MeasurementUnitName { get; set; } = null!;
        public ApprovalStatus ApprovalStatus { get; set; }
        public bool IsFinalApproved { get; set; }


    }

    public class ApproveStoreRequest
    {
        public string Id { get; set; } = null!;
        public double ApprovedQuantity { get; set; }
        public string ApproverEmployeeId { get; set; } = null!;
    }

    public class RejectStoreRequest
    {
        public string Id { get; set; } = null!;
        public string Remark { get; set; } = null!;
    }

}
