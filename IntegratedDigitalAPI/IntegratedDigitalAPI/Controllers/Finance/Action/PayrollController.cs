using Implementation.Helper;
using IntegratedImplementation.DTOS.Finance.Action;
using IntegratedImplementation.Interfaces.Finance.Action;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace IntegratedDigitalAPI.Controllers.Finance.Action
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class PayrollController : ControllerBase
    {
        IPayrollService _payrollService;

        public PayrollController(IPayrollService payrollService)
        {
            _payrollService = payrollService;
        }



        [HttpGet]
        [ProducesResponseType(typeof(PayrollDataListDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetPayrollDataList()
        {
            return Ok(await _payrollService.GetPayrollDataList());
        }

        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> CalculatePayroll(PayrollParams payrollParams)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _payrollService.CalculatePayroll(payrollParams));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> CheckPayroll(ApprovePayrollDataDto payrollDataDto)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _payrollService.CheckPayroll(payrollDataDto));
            }
            else
            {
                return BadRequest();
            }
        } 
        
        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> ApprovePayroll(ApprovePayrollDataDto payrollDataDto)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _payrollService.ApprovePayroll(payrollDataDto));
            }
            else
            {
                return BadRequest();
            }
        }


        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AutorizePayroll(ApprovePayrollDataDto payrollDataDto)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _payrollService.AutorizePayroll(payrollDataDto));
            }
            else
            {
                return BadRequest();
            }
        }



    }
}
