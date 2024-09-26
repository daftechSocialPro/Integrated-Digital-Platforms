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
    public class LeaveTypeController : ControllerBase
    {
        ILeaveTypeService _LeaveTypeService;

        public LeaveTypeController(ILeaveTypeService LeaveTypeService)
        {
            _LeaveTypeService = LeaveTypeService;
        }

        [HttpGet]
        [ProducesResponseType(typeof(LeaveTypeGetDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetLeaveTypeList()
        {
            return Ok(await _LeaveTypeService.GetLeaveTypeList());
        }

     

        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddLeaveType([FromBody] LeaveTypePostDto LeaveTypeDto)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _LeaveTypeService.AddLeaveType(LeaveTypeDto));
            }
            else
            {
                return BadRequest();
            }
        }


        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdateLeaveType(LeaveTypeGetDto LeaveTypeDto)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _LeaveTypeService.UpdateLeaveType(LeaveTypeDto));
            }
            else
            {
                return BadRequest();
            }
        }


        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddLeaveDetail([FromBody] AddLeaveDetailDto leaveDetail)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _LeaveTypeService.AddLeaveDetail(leaveDetail));
            }
            else
            {
                return BadRequest();
            }
        }


        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdateLeaveDetail(UpdateLeaveDetailDto updateLeaveDetail)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _LeaveTypeService.UpdateLeaveDetail(updateLeaveDetail));
            }
            else
            {
                return BadRequest();
            }
        }


        [HttpGet]
        [ProducesResponseType(typeof(LeavePlanSettingGetDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetEmployeeLeavePlan(Guid employeeId)
        {
            return Ok(await _LeaveTypeService.GetEmployeeLeavePlan(employeeId));
        }

        [HttpGet]
        [ProducesResponseType(typeof(LeavePlanSettingGetDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetEmployeeLeavePlans()
        {
            return Ok(await _LeaveTypeService.GetEmployeeLeavePlans());
        }


        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddLeavePlanSetting(LeavePlanSettingPostDto LeaveTypeDto)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _LeaveTypeService.AddEmployeeLeavePlan(LeaveTypeDto));
            }
            else
            {
                return BadRequest();
            }
        }


        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdateLeavePlanSetting(LeavePlanSettingUpdateDto leavePlan)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _LeaveTypeService.UpdateEmployeeLeavePlan(leavePlan));
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
