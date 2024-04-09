using IntegratedImplementation.DTOS.Inventory;
using IntegratedImplementation.Interfaces.Inventory;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace IntegratedDigitalAPI.Controllers.Inventory
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventoryDashboardController : ControllerBase
    {
        private readonly IInventoryDashboard _inventoryDashboard;

        public InventoryDashboardController(IInventoryDashboard inventoryDashboard)
        {
            _inventoryDashboard = inventoryDashboard;
        }

        [HttpGet]
        [ProducesResponseType(typeof(InventoryDashboardDto), (int)HttpStatusCode.OK)]
        public async Task<ActionResult> GetInventoryDashboard(string employeeId) 
        {
            return Ok(await _inventoryDashboard.GetInventoryDashboard(employeeId));
        }
    }
}
