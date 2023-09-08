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

        [HttpGet]
        [ProducesResponseType(typeof(SelectListDto), (int)HttpStatusCode.OK)]

        public async Task<IActionResult> GetLeaveTypeDropDownList()
        {
            return Ok(await _LeaveTypeService.GetLeaveTypeDropdownList());
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
    }
}
