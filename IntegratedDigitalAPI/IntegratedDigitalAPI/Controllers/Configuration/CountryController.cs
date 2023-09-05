using IntegratedImplementation.DTOS.Configuration;
using IntegratedImplementation.Interfaces.Configuration;
using IntegratedImplementation.Interfaces.HRM;
using IntegratedImplementation.Services.HRM;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace IntegratedDigitalAPI.Controllers.Configuration
{
    [Route("api/[controller]")]
    [ApiController]
    public class CountryController : ControllerBase
    {

        ICountryService _CountryService;

        public CountryController(ICountryService CountryService)
        {
            _CountryService = CountryService;
        }

        [HttpGet("getCountryDropdown")]
        [ProducesResponseType(typeof(SelectListDto), (int)HttpStatusCode.OK)]

        public async Task<IActionResult> GetCountryDropdown()
        {
            return Ok(await _CountryService.GetCountryDropdownList());
        }


    }
}
