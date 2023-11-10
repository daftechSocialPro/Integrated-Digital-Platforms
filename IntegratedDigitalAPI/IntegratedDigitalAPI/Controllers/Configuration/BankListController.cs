using Implementation.Helper;
using IntegratedImplementation.DTOS.Configuration;
using IntegratedImplementation.Interfaces.Configuration;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace IntegratedDigitalAPI.Controllers.Configuration
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class BankListController : ControllerBase
    {
        IBankListService _bankListService;

        public BankListController(IBankListService bankListService)
        {
            _bankListService = bankListService;
        }

        [HttpGet]
        [ProducesResponseType(typeof(BankListDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetBankList()
        {
            return Ok(await _bankListService.GetBankList());
        }


        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddBank([FromForm] AddBankDto addBank)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _bankListService.AddBank(addBank));
            }
            else
            {
                return BadRequest();
            }
        }


        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdateBank([FromForm] UpdateBankDto updateBank)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _bankListService.UpdateBank(updateBank));
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
