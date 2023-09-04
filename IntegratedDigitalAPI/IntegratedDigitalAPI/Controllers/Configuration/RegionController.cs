using IntegratedImplementation.DTOS.Configuration;
using IntegratedImplementation.Interfaces.Configuration;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace IntegratedDigitalAPI.Controllers.Configuration
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegionController : ControllerBase
    {

        IRegionService _RegionService;

        public RegionController(IRegionService RegionService)
        {
            _RegionService = RegionService;
        }

        [HttpGet("getRegionDropdown")]
        [ProducesResponseType(typeof(SelectListDto), (int)HttpStatusCode.OK)]

        public async Task<IActionResult> GetRegionDropdown(Guid countryId)
        {
            return Ok(await _RegionService.GetRegionDropdownList(countryId));
        }
    }
}
