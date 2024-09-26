using Implementation.Helper;
using IntegratedImplementation.DTOS.Finance.Configuration;
using IntegratedImplementation.Interfaces.Finance.Configuration;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace IntegratedDigitalAPI.Controllers.Finance.Configuration
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ChartOfAccountController : ControllerBase
    {
        IChartOfAccountService _chartOfAccount;

        public ChartOfAccountController(IChartOfAccountService chartOfAccount)
        {
            _chartOfAccount = chartOfAccount;
        }

        [HttpGet]
        [ProducesResponseType(typeof(ChartOfAccountDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetChartOfAccounts()
        {
            return Ok(await _chartOfAccount.GetChartOfAccounts());
        }


        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddChartOfAccount(AddChartOfAccountDto addChartOfAccountDto)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _chartOfAccount.AddChartOfAccount(addChartOfAccountDto));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddSubsidiaryAccount(AddSubsidiaryAccount addSubsidiaryAccount)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _chartOfAccount.AddSubsidiaryAccount(addSubsidiaryAccount));
            }
            else
            {
                return BadRequest();
            }
        }


        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdateChartOfAccount(UpdateChartOfAccountDto updateChartOfAccount)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _chartOfAccount.UpdateChartOfAccount(updateChartOfAccount));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdateSubsidiaryAccount(UpdateSubsidiaryAccount updateSubsidiaryAccount)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _chartOfAccount.UpdateSubsidiaryAccount(updateSubsidiaryAccount));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> ChangeChartOfAccountStatus(Guid accountId)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _chartOfAccount.ChangeChartOfAccountStatus(accountId));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> ChangeSubsidiaryAccountStatus(Guid subsidiaryId)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _chartOfAccount.ChangeSubsidiaryAccountStatus(subsidiaryId));
            }
            else
            {
                return BadRequest();
            }
        }
    }
}   
