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
    public class LoanSettingController : ControllerBase
    {
        ILoanSettingService _loanSettingService;

        public LoanSettingController(ILoanSettingService loanSettingService)
        {
            _loanSettingService = loanSettingService;
        }

        [HttpGet]
        [ProducesResponseType(typeof(LoanSettingDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetLoanSettings()
        {
            return Ok(await _loanSettingService.GetLoanSettings());
        }


        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddLoanSetting([FromBody] AddLoanSettingDto addLoanSetting)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _loanSettingService.AddLoanSetting(addLoanSetting));
            }
            else
            {
                return BadRequest();
            }
        }


        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdateLoanSetting(UpdateLoanSettingDto updateLoanSetting)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _loanSettingService.UpdateLoanSetting(updateLoanSetting));
            }
            else
            {
                return BadRequest();
            }
        }
    }
}

