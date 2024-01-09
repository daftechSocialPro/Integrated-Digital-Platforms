using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Collections.Generic;
using System.Net;
using Microsoft.AspNetCore.Mvc.Rendering;
using IntegratedImplementation.Interfaces.Inventory;
using IntegratedImplementation.DTOS.Inventory;

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
        [HttpPost]
        [ProducesResponseType(typeof(File), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetBalanceReport(BalanceReportDto balanceReport)
        {
            var report = await _inventoryReports.GetBalanceReport(balanceReport);
            return File(report, "application/pdf");
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
