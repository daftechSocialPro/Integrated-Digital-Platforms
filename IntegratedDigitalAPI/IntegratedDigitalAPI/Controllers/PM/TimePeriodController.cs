using Implementation.Helper;
using IntegratedImplementation.DTOS.HRM;
using IntegratedImplementation.DTOS.PM;
using IntegratedImplementation.Interfaces.HRM;
using IntegratedImplementation.Interfaces.PM;
using IntegratedInfrustructure.Model.PM;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace IntegratedDigitalAPI.Controllers.PM
{
    [Route("api/PM/[controller]/[action]")]
    [ApiController]
    public class TimePeriodController : ControllerBase
    {

        ITimePeriodService _timePeriodService;

        public TimePeriodController(ITimePeriodService timePeriodService)
        {
            _timePeriodService = timePeriodService;
        }

        [HttpGet]
        [ProducesResponseType(typeof(ReportingPeriodGetDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetReportingPeriodList()
        {
            return Ok(await _timePeriodService.GetReportingPeriodList());
        }


        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddReportingPeriod([FromBody] ReportingPeriodPostDto reportingPeriod)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _timePeriodService.AddReportingPeriod(reportingPeriod));
            }
            else
            {
                return BadRequest();
            }
        }


        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdateReportingPeriod(ReportingPeriodGetDto reportingPeriod)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _timePeriodService.UpdateReportingPeriod(reportingPeriod));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> DeleteReportingPeriod(Guid id)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _timePeriodService.DeleteReportingPeriod(id));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [ProducesResponseType(typeof(ReportingPeriodGetDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetBudgetYearList()
        {
            return Ok(await _timePeriodService.GetBudgetYears());
        }


        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddBudgetYear([FromBody] BudgetYearDto budgetYear)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _timePeriodService.AddBudgetYears(budgetYear));
            }
            else
            {
                return BadRequest();
            }
        }


        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdateBudgetYear(BudgetYearDto budgetYear)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _timePeriodService.UpdateBudgetYears(budgetYear));
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
