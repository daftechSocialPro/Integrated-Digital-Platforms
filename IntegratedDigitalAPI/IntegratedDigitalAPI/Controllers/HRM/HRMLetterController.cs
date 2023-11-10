using Implementation.Helper;
using IntegratedImplementation.DTOS.HRM;
using IntegratedImplementation.Interfaces.HRM;
using IntegratedImplementation.Services.HRM;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace IntegratedDigitalAPI.Controllers.HRM
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class HRMLetterController : ControllerBase
    {
        IHrmLetterService _hrmLetterService;

        public HRMLetterController(IHrmLetterService hrmLetterService)
        {
            _hrmLetterService = hrmLetterService;
        }

        [HttpGet]
        [ProducesResponseType(typeof(ContractLetterDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetContractLetter(string historyId)
        {
            return Ok(await _hrmLetterService.GetContractLetter(historyId));
        }


        
    }
}
