using Implementation.Helper;
using IntegratedImplementation.DTOS.Configuration;
using IntegratedImplementation.DTOS.HRM;
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

        [HttpGet]
        [ProducesResponseType(typeof(CountryGetDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetCountryList()
        {
            return Ok(await _CountryService.GetCountryList());
        }

        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddCountry( CountryPostDto CountryDto)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _CountryService.AddCountry(CountryDto));
            }
            else
            {
                return BadRequest();
            }
        }


        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdateCountry(CountryGetDto CountryDto)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _CountryService.UpdateCountry(CountryDto));
            }
            else
            {
                return BadRequest();
            }
        }


    }
}
