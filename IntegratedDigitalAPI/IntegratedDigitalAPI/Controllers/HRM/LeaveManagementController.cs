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
    public class LeaveManagementController : ControllerBase
    {
        ILeaveManagementService _leaveService;

        public LeaveManagementController(ILeaveManagementService leaveService)
        {
            _leaveService = leaveService;
        }

       
        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddLeaveBalance([FromBody] AddLeaveBalanceDto addLeaveBalance)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _leaveService.AddLeaveBalance(addLeaveBalance));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddLeaveRequest([FromBody] LeaveRequestDto leaveRequestDto)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _leaveService.AddLeaveRequest(leaveRequestDto));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> ApproveRequest(Guid leaveId, Guid employeeId)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _leaveService.ApproveRequest(leaveId, employeeId));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> RejectRequest( Guid leaveId, string remark)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _leaveService.RejectRequest(leaveId, remark));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [ProducesResponseType(typeof(LeavesTakenDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetEmployeeLeaves(Guid employeeId)
        {
            return Ok(await _leaveService.GetEmployeeLeaves(employeeId));
        }

        [HttpGet]
        [ProducesResponseType(typeof(LeavesTakenDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetSingleLeaveRequest(Guid requestId)
        {
            return Ok(await _leaveService.GetSingleRequest(requestId));
        }


        [HttpGet]
        [ProducesResponseType(typeof(LeavesTakenDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetLeaveRequests()
        {
            return Ok(await _leaveService.GetLeaveRequests());
        }

        [HttpGet]
        [ProducesResponseType(typeof(LeavesTakenDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetAnnualLeaveBalance(Guid employeeId)
        {
            return Ok(await _leaveService.GetAnnualLeaveBalance(employeeId));
        }
    }
}
