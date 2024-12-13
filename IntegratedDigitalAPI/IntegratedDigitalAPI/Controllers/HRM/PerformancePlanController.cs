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


        [HttpGet]
        [ProducesResponseType(typeof(PerformanceScalesDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetPerformanceScales()
        {
            return Ok(await _performancePlan.GetPerformanceScales());
        }


        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddPerfomanceScale([FromBody] AddPerformanceScaleDto addPerformanceScaleDto)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _performancePlan.AddPerfomanceScale(addPerformanceScaleDto));
            }
            else
            {
                return BadRequest();
            }
        }


        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdatePerformanceScale([FromBody] PerformanceScalesDto updatePerformanceScale)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _performancePlan.UpdatePerformanceScale(updatePerformanceScale));
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
