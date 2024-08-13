using IntegratedDigitalAPI.DTOS.PM;
using IntegratedDigitalAPI.Services.PM;
using IntegratedDigitalAPI.Services.PM.Plan;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static IntegratedDigitalAPI.Services.PM.PlanService;

namespace IntegratedDigitalAPI.Controllers.PM
{
    [Route("api/PM/[controller]")]
    [ApiController]
    public class PlanController : ControllerBase
    {

        private readonly IPlanService _planService;
        public PlanController(IPlanService planService)
        {
            _planService = planService;
        }

        [HttpPost]
        public IActionResult Create([FromBody] PlanDto plan)
        {
            try
            {
                var response = _planService.CreatePlan(plan);
                return Ok(new { response });

            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error : {ex}");
            }
        }


        [HttpPut("planUpdate")]
        public IActionResult Update([FromBody] PlanDto plan)
        {
            try
            {
                var response = _planService.UpdatePlan(plan);
                return Ok(new { response });

            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error : {ex}");
            }
        }

        [HttpGet("GetDateAndTime")]

        public async Task<GetStartEndDate> GetDateAndTime(Guid PlanId)
        {

            var response = await _planService.GetDateTime(PlanId);
            return response;
        }

        [HttpGet]

        public async Task<List<PlanViewDto>> Getplan(Guid? programId , int ? year)
        {

          
            var response = await _planService.GetPlans(programId,year);
            return response;
        }

        [HttpGet("getbyplanid")]

        public async Task<PlanSingleViewDto> GetPlan(Guid planId)
        {
            var response = await _planService.GetSinglePlan(planId);

            return response;
        }


        [HttpGet("getByProgramIdSelectList")]

        public async Task<IActionResult> GetBYPromgramIdSelectList()
        {
            try
            {
                return Ok(await _planService.GetPlansSelectList());
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpDelete("deletePlan")]
        public async Task<IActionResult> DeletePlan(Guid planId)
        {
            try
            {
                return Ok(await _planService.DeleteProject(planId));
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpGet("getPlanPieCharts")]

        public async Task<IActionResult> GetPlanPieCharts(Guid planId,Guid? StrategicPlanId, int quarter, int? year )
        {
            try
            {
                return Ok(await _planService.GetPlanPieCharts(planId, StrategicPlanId, quarter, year ));
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }
        [HttpGet("getPlanBarCharts")]

        public async Task<IActionResult> GetPlanBarCharts(Guid? planId, Guid? strategicPlanId, int? year)
        {
            try
            {
                return Ok(await _planService.GetPlanBarCharts(planId, strategicPlanId, year));
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpGet("getStrategicPlan")]

        public async Task<IActionResult> GetStrategicPlans()
        {
            try
            {
                return Ok(await _planService.GetStrategicPlanReport());
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }

    }
}
