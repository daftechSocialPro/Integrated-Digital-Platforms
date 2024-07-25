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
    public class TaxRateController : ControllerBase
    {
        ITaxRateService _taxRateService;

        public TaxRateController(ITaxRateService taxRateService)
        {
            _taxRateService = taxRateService;
        }

        [HttpGet]
        [ProducesResponseType(typeof(AccountTypeGetDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetTaxRate()
        {
            return Ok(await _taxRateService.GetTaxRate());
        }


        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddTaxRate(AddTaxRateDto addTaxRate)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _taxRateService.AddTaxRate(addTaxRate));
            }
            else
            {
                return BadRequest();
            }
        }

    }
}
