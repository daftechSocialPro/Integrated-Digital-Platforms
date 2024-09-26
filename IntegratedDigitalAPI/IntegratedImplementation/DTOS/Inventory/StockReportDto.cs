namespace IntegratedImplementation.DTOS.Inventory
{
    public class StockReportDto
    {
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public string BranchId { get; set; } = null!;
    }



    public class BalanceTempData
    {
        public Guid ItemId { get; set; }
        public string CategoryType { get; set; } = null!;
        public string CategoryName { get; set; } = null!;
        public string ItemName { get; set; } = null!;
        public string MeasurementUnit { get; set; } = null!;
        public double Quantity { get; set; }
    }

    public class GroupedGoodsReceivingReport
    {
        public Guid ItemId { get; set; }
        public string ItemName { get; set; }
        public List<GoodsReceivingReportDetail> Details { get; set; }
    }

    public class GoodsReceivingReportDetail
    {
        public DateTime RecivedDate { get; set; }
        public string Row { get; set; }
        public string Column { get; set; }
        public double Quantity { get; set; }
        public string MeasurementUnit { get; set; }
        public double SinglePrice { get; set; }
        public double TotalPrice { get; set; }
    }

    public record InventorySettelmentReport
    {
        public Guid ItemId { get; set; }
        public string ItemName { get; set; }
        public List<InventorySettelmentReportDetail> Details { get; set; }

    }

    public record InventorySettelmentReportDetail
    {
        public DateTime AdjustmentDate { get; set; }
        public string MeasurementUnit { get; set; }
        public double PreviousQuantity { get; set; }
        public double AdjustedQuantity { get; set; }
        public double Variance { get; set; }
        public string AdjustmentReason { get; set; }
        public string AdjustedBy { get; set; }
    }
}
