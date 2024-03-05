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
    public class AccountingPeriodController : ControllerBase
    {

        IAccountingPeriodService _accountingPeriod;

        public AccountingPeriodController(IAccountingPeriodService accountingPeriod)
        {
            _accountingPeriod = accountingPeriod;
        }

        [HttpGet]
        [ProducesResponseType(typeof(AccountTypeGetDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetAccountingPeriod()
        {
            return Ok(await _accountingPeriod.GetAccountingPeriod());
        }


        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddAccountingPeriod(AddAccountingPeriodDto accountingPeriod)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _accountingPeriod.AddAccountingPeriod(accountingPeriod));
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
