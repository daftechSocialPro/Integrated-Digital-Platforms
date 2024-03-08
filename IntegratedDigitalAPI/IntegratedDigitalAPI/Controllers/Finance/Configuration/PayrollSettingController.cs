using Implementation.Helper;
using IntegratedImplementation.DTOS.Finance.Configuration;
using IntegratedImplementation.DTOS.HRM;
using IntegratedImplementation.Interfaces.Finance.Configuration;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace IntegratedDigitalAPI.Controllers.Finance.Configuration
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class PayrollSettingController : ControllerBase
    {
        IPayrollSettingService _payrollSetting;

        public PayrollSettingController(IPayrollSettingService payrollSetting)
        {
            _payrollSetting = payrollSetting;
        }

       

        [HttpGet]
        [ProducesResponseType(typeof(GeneralPayrollSettingListDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetGeneralPayrollSettings()
        {
            return Ok(await _payrollSetting.GetGeneralPayrollSettings());
        }

        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> SaveGeneralPayrollSetting(GeneralPayrollSettingDto addPayrollSetting)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _payrollSetting.SaveGeneralPayrollSetting(addPayrollSetting));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [ProducesResponseType(typeof(IncomeTaxDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetIncomeTax()
        {
            return Ok(await _payrollSetting.GetIncomeTax());
        }

        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddIncomeTax(IncomeTaxDto incomeTax)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _payrollSetting.AddIncomeTax(incomeTax));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdateIncomeTax(IncomeTaxDto incomeTax)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _payrollSetting.UpdateIncomeTax(incomeTax));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [ProducesResponseType(typeof(BenefitPayrollDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetBenefitPayrolls()
        {
            return Ok(await _payrollSetting.GetBenefitPayrolls());
        }

        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddBenefitPayroll(AddBenefitPayroll addBenefitPayroll)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _payrollSetting.AddBenefitPayroll(addBenefitPayroll));
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
