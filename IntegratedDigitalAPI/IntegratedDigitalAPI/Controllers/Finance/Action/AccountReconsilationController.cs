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
    public class AccountReconsilationController : ControllerBase
    {
        IAccountReconsilationService _accountReconsilation;

        public AccountReconsilationController(IAccountReconsilationService accountReconsilation)
        {
            _accountReconsilation = accountReconsilation;
        }

        [HttpPost]
        [ProducesResponseType(typeof(AccountToBeReconsiledDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetAccountToBeReconsiled(AccountReconsilationFindDto reconsilationFindDto)
        {
            return Ok(await _accountReconsilation.GetAccountToBeReconsiled(reconsilationFindDto));
        }

        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddAccountReconsilation(AddAccountReconsilationDto addAccountReconsilation)
        {
            return Ok(await _accountReconsilation.AddAccountReconsilation(addAccountReconsilation));
        }
    }
}
