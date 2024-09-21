using IntegratedImplementation.DTOS.Inventory;
using IntegratedImplementation.Interfaces.Inventory;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace IntegratedDigitalAPI.Controllers.Inventory
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class InventoryReportController : ControllerBase
    {

        IInventoryReportService _inventoryReports;

        public InventoryReportController(IInventoryReportService inventoryReports)
        {
            _inventoryReports = inventoryReports;
        }



        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [ProducesResponseType(typeof(BalanceTempData), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetBalanceReport()
        {
            return Ok(await _inventoryReports.GetBalanceReport());
        }

        [HttpGet]
        [ProducesResponseType(typeof(List<GroupedGoodsReceivingReport>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetGroupedGoodsReceivingReport(DateTime fromDate, DateTime toDate)
        {
            return Ok(await _inventoryReports.GetGroupedGoodsReceivingReport(fromDate, toDate));
        }

        [HttpGet]
        [ProducesResponseType(typeof(List<InventorySettelmentReport>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetSettelementReport(DateTime fromDate, DateTime toDate)
        {
            return Ok(await _inventoryReports.GetSettelementReport(fromDate, toDate));
        }

        [HttpPost]
        [ProducesResponseType(typeof(File), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetStockReport(StockReportDto stockReport)
        {
            var report = await _inventoryReports.GetStockReport(stockReport);
            return File(report, "application/pdf");
        }


        [HttpPost]
        [ProducesResponseType(typeof(File), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetOutReport(StockReportDto stockReport)
        {
            var report = await _inventoryReports.GetOutReport(stockReport);
            return File(report, "application/pdf");
        }

    }
}
