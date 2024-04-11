using IntegratedImplementation.DTOS.HRM;
using IntegratedImplementation.Interfaces.HRM;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace IntegratedDigitalAPI.Controllers.HRM
{
    [Route("api/[controller]")]
    [ApiController]
    public class HrmDashboardController : ControllerBase
    {
        private readonly IHrmDashboardService _hrmDashboardService;

        public HrmDashboardController(IHrmDashboardService hrmDashboardService)
        {
            _hrmDashboardService = hrmDashboardService;
        }

        [HttpGet]
        [ProducesResponseType(typeof(HrmDashboardDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetHrmDashboard()
        {
            return Ok (await _hrmDashboardService.GetHrmDashboard());
        }
    }
}
