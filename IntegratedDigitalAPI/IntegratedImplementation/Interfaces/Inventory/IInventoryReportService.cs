using IntegratedImplementation.DTOS.Inventory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Interfaces.Inventory
{
    public interface IInventoryReportService
    {
        Task<byte[]> GetStockReport(StockReportDto stockReport);
        Task<byte[]> GetOutReport(StockReportDto stockReport);
        Task<byte[]> GetBalanceReport(BalanceReportDto balanceReport);
    }
}
