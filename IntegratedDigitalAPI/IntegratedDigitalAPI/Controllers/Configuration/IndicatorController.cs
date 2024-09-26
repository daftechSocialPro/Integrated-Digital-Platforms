

using Implementation.Helper;
using IntegratedImplementation.DTOS.Configuration;
using IntegratedImplementation.Interfaces.Configuration;
using IntegratedImplementation.Services.Configuration;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace IntegratedDigitalAPI.Controllers.Configuration
{
    [Route("api/[controller]")]
    [ApiController]
    public class IndicatorController : ControllerBase
    {

        private readonly IIndicatorService _indicatorService;
        public IndicatorController(IIndicatorService indicatorService)
        {

            _indicatorService = indicatorService;

        }

        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> CreateIndicator([FromBody] IndicatorPostDto indicator)
        {
            if (ModelState.IsValid)
            {
                return  Ok(await _indicatorService.CreateIndicator(indicator));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [ProducesResponseType(typeof(IndicatorGetDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetIndicator()
        {
            return Ok(await _indicatorService.GetIndicator());
        }

        [HttpGet("GetIndicatorByStrategicPlan")]
        [ProducesResponseType(typeof(IndicatorGetDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetIndicatorByStrategicPlan(Guid strategicPlanId)
        {
            return Ok(await _indicatorService.GetIndicatorByStrategicPlan(strategicPlanId));
        }

        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdateIndicator(IndicatorGetDto indicator)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _indicatorService.UpdateIndicator(indicator));
            }
            else
            {
                return BadRequest();
            }
        }


    }
}
