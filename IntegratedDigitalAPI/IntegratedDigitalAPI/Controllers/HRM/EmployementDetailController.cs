using Implementation.Helper;
using IntegratedImplementation.DTOS.HRM;
using IntegratedImplementation.Interfaces.HRM;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace IntegratedDigitalAPI.Controllers.HRM
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class EmployementDetailController : ControllerBase
    {
        IEmployementDetailService _employementDetailService;

        public EmployementDetailController(IEmployementDetailService employementDetailService)
        {
            _employementDetailService = employementDetailService;
        }

        [HttpGet]
        [ProducesResponseType(typeof(ResignationRequestListDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> TerminatedEmployeesList()
        {
            return Ok(await _employementDetailService.TerminatedEmployeesList());
        }


        [HttpGet]
        [ProducesResponseType(typeof(TerminatedEmployeesDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetResingationLists()
        {
            return Ok(await _employementDetailService.GetResingationLists());
        }

        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> RequestResignationLetter([FromBody] ResignationRequestDto resignationRequest)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _employementDetailService.RequestResignationLetter(resignationRequest));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> ApproveResignationRequest([FromBody] Guid requestId, Guid employeeId)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _employementDetailService.ApproveResignationRequest(requestId, employeeId));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [ProducesResponseType(typeof(ApprovedResignationListDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> ApprovedResignationListDto()
        {
            return Ok(await _employementDetailService.ApprovedResignationListDto());
        }

        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> TerminateRequester([FromBody] Guid requestId)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _employementDetailService.TerminateRequester(requestId));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> TerminateEmployee(Guid employementDetailId, string remark, bool blacListed)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _employementDetailService.TerminateEmployee(employementDetailId, remark, blacListed));
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
