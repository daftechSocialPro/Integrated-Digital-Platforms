using Implementation.Helper;
using IntegratedImplementation.DTOS.Configuration;
using IntegratedImplementation.Interfaces.Configuration;
using IntegratedImplementation.Services.Configuration;
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

       
        [HttpGet]
        [ProducesResponseType(typeof(RegionGetDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetRegionList()
        {
            return Ok(await _RegionService.GetRegionList());
        }

        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddRegion([FromBody] RegionPostDto RegionDto)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _RegionService.AddRegion(RegionDto));
            }
            else
            {
                return BadRequest();
            }
        }


        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdateRegion(RegionPostDto RegionDto)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _RegionService.UpdateRegion(RegionDto));
            }
            else
            {
                return BadRequest();
            }
        }

    }
}
