using Implementation.Helper;
using IntegratedImplementation.DTOS.PM;
using IntegratedImplementation.Interfaces.PM;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace IntegratedDigitalAPI.Controllers.PM
{
    [Route("api/[controller]")]
    [ApiController]
    public class StrategicPeriodController : ControllerBase
    {
        IStrategicPeriodService _strategicPeriodService;

        public StrategicPeriodController(IStrategicPeriodService strategicPeriodService)
        {
            _strategicPeriodService = strategicPeriodService;
        }

        [HttpGet]
        [ProducesResponseType(typeof(StrategicPeriodGetDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetStrategicPeriodList()
        {
            return Ok(await _strategicPeriodService.GetStrategicPeriodList());
        }

        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddStrategicPeriod([FromBody] StrategicPeriodPostDto strategicPeriodDto)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _strategicPeriodService.AddStrategicPeriod(strategicPeriodDto));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdateStrategicPeriod(StrategicPeriodGetDto strategicPeriodGetDto)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _strategicPeriodService.UpdateStrategicPeriod(strategicPeriodGetDto));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> DeleteStrategicPeriod(Guid id)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _strategicPeriodService.DeleteStrategicPeriod(id));
            }
            else
            {
                return BadRequest();
            }
        }
    }
}

