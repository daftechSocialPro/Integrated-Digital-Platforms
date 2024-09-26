using Implementation.Helper;
using MembershipImplementation.DTOS.Configuration;
using MembershipImplementation.DTOS.HRM;
using MembershipImplementation.Interfaces.Configuration;
using MembershipImplementation.Interfaces.HRM;
using MembershipImplementation.Services.HRM;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace MembershipDigitalAPI.Controllers.Configuration
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

        [HttpDelete]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> DeleteCountry(Guid countryId)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _CountryService.DeleteCountry(countryId));
            }
            else
            {
                return BadRequest();
            }
        }


    }
}
