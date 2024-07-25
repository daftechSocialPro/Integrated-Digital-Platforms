using IntegratedImplementation.Interfaces.Finance.Report;
using Microsoft.AspNetCore.Mvc;

namespace IntegratedDigitalAPI.Controllers.Finance.Report
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class FinanceDashboardController : ControllerBase
    {
        private readonly IFinanceDashboardService _financeDashboard;

        public FinanceDashboardController(IFinanceDashboardService financeDashboard)
        {
            _financeDashboard = financeDashboard;
        }

        [HttpGet]
        public async Task<IActionResult> GetDashboardData()
        {
            return Ok(await _financeDashboard.GetDashboardData());
        }

        [HttpGet]
        public async Task<IActionResult> GetDashboardChart(Guid planId)
        {
            return Ok(await _financeDashboard.GetDashboardChart(planId));
        }
    }
}
