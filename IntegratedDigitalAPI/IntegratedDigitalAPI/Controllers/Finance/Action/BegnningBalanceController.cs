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
    public class BegnningBalanceController : ControllerBase
    {


        IBegnningBalanceService _begnningBalance;

        public BegnningBalanceController(IBegnningBalanceService begnningBalance)
        {
            _begnningBalance = begnningBalance;
        }

        [HttpGet]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetChartsForBegnning(Guid PeriodId)
        {
            return Ok(await _begnningBalance.GetChartsForBegnning(PeriodId));
        }

        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddBegnningBalance(AddBegnningBalanceDto addBegnningBalance)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _begnningBalance.AddBegnningBalance(addBegnningBalance));
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
