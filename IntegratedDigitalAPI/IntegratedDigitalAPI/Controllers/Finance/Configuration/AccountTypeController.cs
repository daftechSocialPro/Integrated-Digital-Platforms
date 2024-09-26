using Implementation.Helper;
using IntegratedImplementation.DTOS.Configuration;
using IntegratedImplementation.DTOS.Finance.Configuration;
using IntegratedImplementation.DTOS.HRM;
using IntegratedImplementation.Interfaces.Finance.Configuration;
using IntegratedImplementation.Interfaces.HRM;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace IntegratedDigitalAPI.Controllers.Finance.Configuration
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AccountTypeController : ControllerBase
    {

        IAccountTypeService _accountTypeService;

        public AccountTypeController(IAccountTypeService accountTypeService)
        {
            _accountTypeService = accountTypeService;
        }

        [HttpGet]
        [ProducesResponseType(typeof(AccountTypeGetDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetAccountTypes()
        {
            return Ok(await _accountTypeService.GetAccountTypes());
        }


        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddAccountType(AccountTypePostDto accountTypePostDto)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _accountTypeService.AddAccountType(accountTypePostDto));
            }
            else
            {
                return BadRequest();
            }
        }


        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdateAccountType(AccountTypeGetDto accountTypePostDto)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _accountTypeService.UpdateAccountType(accountTypePostDto));
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
