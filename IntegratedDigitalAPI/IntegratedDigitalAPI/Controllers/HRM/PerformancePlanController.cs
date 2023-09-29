using Implementation.Helper;
using IntegratedImplementation.DTOS.HRM;
using IntegratedImplementation.Interfaces.HRM;
using IntegratedImplementation.Services.HRM;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace IntegratedDigitalAPI.Controllers.HRM
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class PerformancePlanController : ControllerBase
    {
        private readonly IPerformancePlanService _performancePlan;

        public PerformancePlanController(IPerformancePlanService performancePlan)
        {
            _performancePlan = performancePlan;
        }

        [HttpGet]
        [ProducesResponseType(typeof(PerformancePlanDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetPerformancePlans()
        {
            return Ok(await _performancePlan.GetPerformancePlans());
        }


        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddPerformancePlan([FromBody] AddPerformancePlanDto addPerformancePlan)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _performancePlan.AddPerformancePlan(addPerformancePlan));
            }
            else
            {
                return BadRequest();
            }
        }


        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdatePerformancePlan(UpdateperformancePlanDto updatePerformancePlan)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _performancePlan.UpdatePerformancePlan(updatePerformancePlan));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddPerformancePlanDetail([FromBody] AddPerformancePlanDetailDto addPerformancePlan)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _performancePlan.AddPerformancePlanDetail(addPerformancePlan));
            }
            else
            {
                return BadRequest();
            }
        }


        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdatePerformancePlanDetail(UpdatePerfromancePlanDetailDto updatePerformancePlan)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _performancePlan.UpdatePerformancePlanDetail(updatePerformancePlan));
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
