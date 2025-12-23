using Implementation.Helper;
using IntegratedImplementation.DTOS.HRM;
using IntegratedImplementation.DTOS.PM;
using IntegratedImplementation.Interfaces.HRM;
using IntegratedImplementation.Interfaces.PM;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace IntegratedDigitalAPI.Controllers.PM
{
    [Route("api/[controller]")]
    [ApiController]
    public class StrategicPlanController : ControllerBase
    {
        IStrategicPlanService _strategicPlanService;

        public StrategicPlanController(IStrategicPlanService strategicPlanService)
        {
            _strategicPlanService = strategicPlanService;
        }

        [HttpGet]
        [ProducesResponseType(typeof(StrategicPlanGetDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetStrategicPlanList()
        {
            return Ok(await _strategicPlanService.GetStrategicPlanList());
        }


        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddStrategicPlan([FromBody] StrategicPlanPostDto strategicPlanDto)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _strategicPlanService.AddStrategicPlan(strategicPlanDto));
            }
            else
            {
                return BadRequest();
            }
        }


        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdateStrategicPlan(StrategicPlanGetDto strategicPlanGetDto)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _strategicPlanService.UpdateStrategicPlan(strategicPlanGetDto));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet("GetStrategicPlanForReport")]
        public async Task<IActionResult> GetStrategicPlanForReport(Guid strategicPlanId)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _strategicPlanService.GetStrategicPlanReport(strategicPlanId));

            }else
            {
                return BadRequest();
            }

        }

        [HttpGet("GetActivitiesFromProject")]
        public async Task<IActionResult> GetActivitiesFromProject(Guid projectId)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _strategicPlanService.GetActivitiesFromProject(projectId));

            }
            else
            {
                return BadRequest();
            }

        }

        [HttpDelete]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> DeleteStrategicPlan(Guid id)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _strategicPlanService.DeleteStrategicPlan(id));
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
