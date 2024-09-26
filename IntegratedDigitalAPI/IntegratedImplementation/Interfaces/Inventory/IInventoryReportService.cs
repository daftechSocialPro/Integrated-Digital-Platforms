using IntegratedImplementation.DTOS.Inventory;

namespace IntegratedImplementation.Interfaces.Inventory
{
    public interface IInventoryReportService
    {
        Task<byte[]> GetStockReport(StockReportDto stockReport);
        Task<byte[]> GetOutReport(StockReportDto stockReport);
        Task<List<BalanceTempData>> GetBalanceReport();
        Task<List<GroupedGoodsReceivingReport>> GetGroupedGoodsReceivingReport(DateTime fromDate, DateTime toDate);
        Task<List<InventorySettelmentReport>> GetSettelementReport(DateTime fromDate, DateTime toDate);
    }
}
