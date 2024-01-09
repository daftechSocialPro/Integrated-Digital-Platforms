using Implementation.Helper;
using IntegratedImplementation.DTOS.PM;
using IntegratedImplementation.DTOS.Training;
using IntegratedImplementation.Interfaces.PM;
using IntegratedImplementation.Interfaces.Training;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace IntegratedDigitalAPI.Controllers.PM
{
    [Route("api/PM/[controller]/[action]")]
    [ApiController]
    public class WeekllyPlanController : ControllerBase
    {
        IWeeklyPlanService _weeklyPlanService;

        public WeekllyPlanController(IWeeklyPlanService weeklyPlanService)
        {
            _weeklyPlanService = weeklyPlanService;
        }
        [HttpGet]
        [ProducesResponseType(typeof(WeeklyPlanDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetWeeklyPlanss()
        {
            return Ok(await _weeklyPlanService.GetWeeklyPlans());
        }

        [HttpGet]
        [ProducesResponseType(typeof(WeeklyPlanDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetWeeklyPlans(Guid employeeId)
        {
            return Ok(await _weeklyPlanService.GetWeeklyPlans(employeeId));
        }

        [HttpGet]
        [ProducesResponseType(typeof(WeeklyPlanDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetWeeklyRequestedPlans()
        {
            return Ok( await _weeklyPlanService.GetWeeklyRequestedPlans());
        }

        
        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddWeklyPlan(WeeklyPlanDto weeklyPlanPost)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _weeklyPlanService.AddWeeklyPlan(weeklyPlanPost));
            }
            else
            {
                return BadRequest();


            }
        }

        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdateStatusWeeklyPlan(string weeklyPlanStatus,Guid weeklyPlanId,string? remark)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _weeklyPlanService.UpdateStatusWeeklyPlan(weeklyPlanStatus, weeklyPlanId, remark));
            }
            else
            {
                return BadRequest();


            }
        }







    }
}
