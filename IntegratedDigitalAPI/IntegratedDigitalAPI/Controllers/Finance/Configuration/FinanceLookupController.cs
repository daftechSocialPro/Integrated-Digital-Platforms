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
    public class FinanceLookupController : ControllerBase
    {
        IFinanceLookupService _FinanceLookupService;

        public FinanceLookupController(IFinanceLookupService FinanceLookupService)
        {
            _FinanceLookupService = FinanceLookupService;
        }

        [HttpGet]
        [ProducesResponseType(typeof(FinanceLookupGetDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetFinanceLookups()
        {
            return Ok(await _FinanceLookupService.GetFinanceLookups());
        }


        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddFinanceLookup(FinanceLookupPostDto FinanceLookupPostDto)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _FinanceLookupService.AddFinanceLookup(FinanceLookupPostDto));
            }
            else
            {
                return BadRequest();
            }
        }


        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdateFinanceLookup(FinanceLookupGetDto FinanceLookupPostDto)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _FinanceLookupService.UpdateFinanceLookup(FinanceLookupPostDto));
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
