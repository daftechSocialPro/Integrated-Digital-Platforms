using Implementation.Helper;
using IntegratedImplementation.DTOS.Configuration;
using IntegratedImplementation.DTOS.HRM;
using IntegratedImplementation.Interfaces.HRM;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace IntegratedDigitalAPI.Controllers.HRM
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class EmploeePerformanceController : ControllerBase
    {
        IEmployeePerformanceService _employeePerformance;

        public EmploeePerformanceController(IEmployeePerformanceService employeePerformance)
        {
            _employeePerformance = employeePerformance;
        }

        [HttpGet]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetPerformanceTime()
        {
            return Ok(await _employeePerformance.GetPerformanceTime());
        }


        [HttpGet]
        [ProducesResponseType(typeof(SelectListDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetToBeFilledEmployees(Guid employeeId)
        {
            return Ok(await _employeePerformance.GetToBeFilledEmployees(employeeId));
        }

        [HttpGet]
        [ProducesResponseType(typeof(EmploeePerformanceDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetEmployeePerformance(Guid employeeId, int monthIndex)
        {
            return Ok(await _employeePerformance.GetEmployeePerformance(employeeId, monthIndex));
        }



        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> StartEvaluation([FromBody] Guid employeeId, int monthIndex, string createdById)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _employeePerformance.StartEvaluation(employeeId, monthIndex, createdById));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [ProducesResponseType(typeof(EmployeePerformancePlanDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> EmployeePerformancePlan(Guid performanceId)
        {
            return Ok(await _employeePerformance.EmployeePerformancePlan(performanceId));
        }

    }
}
