using Implementation.Helper;
using IntegratedImplementation.DTOS.HRM;
using IntegratedImplementation.Interfaces.HRM;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Xml.Serialization;

namespace IntegratedDigitalAPI.Controllers.HRM
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class EmployeeAttencanceController : ControllerBase
    {
        IEmployeeAttendanceService _attendanceService;

        public EmployeeAttencanceController(IEmployeeAttendanceService attendanceService)
        {
            _attendanceService = attendanceService;
        }

        [HttpGet]
        public async Task<IActionResult> GetFingerPrintEmployees()
        {
            return Ok(await _attendanceService.GetFingerPrintEmployees());
        }

        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddFingerPrint(AddEmployeeFingerPrintDto employee)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _attendanceService.AddFingerPrint(employee));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdateFingerPrint(UpdateEmployeeFingerPrintDto fintePrintDto)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _attendanceService.UpdateFingerPrint(fintePrintDto));
            }
            else
            {
                return BadRequest();
            }
        }



        [HttpGet]
        [ProducesResponseType(typeof(ShiftListDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetShiftLists()
        {
            return Ok(await _attendanceService.GetShiftLists());
        }


        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddShift([FromBody] ShiftListDto shiftDto)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _attendanceService.AddShift(shiftDto));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> BindShift([FromBody] BindShiftDto shiftDto)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _attendanceService.BindShift(shiftDto));
            }
            else
            {
                return BadRequest();
            }
        }


        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdateShift(ShiftListDto shiftListDto)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _attendanceService.UpdateShift(shiftListDto));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddShiftDetail([FromBody] AddShiftDetail addShiftDetail)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _attendanceService.AddShiftDetail(addShiftDetail));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [ProducesResponseType(typeof(PenaltyListDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetPenaltyLists()
        {
            return Ok(await _attendanceService.GetPenaltyLists());
        }

        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddPenalty(AddPenaltyDto penalty)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _attendanceService.AddPenalty(penalty));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> ChangeStatusofPenalty(string penaltyId)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _attendanceService.ChangeStatusofPenalty(penaltyId));
            }
            else
            {
                return BadRequest();
            }
        }

    }
}
