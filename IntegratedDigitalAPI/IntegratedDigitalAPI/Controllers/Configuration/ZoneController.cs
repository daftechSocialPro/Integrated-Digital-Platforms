using Implementation.Helper;
using IntegratedImplementation.DTOS.Configuration;
using IntegratedImplementation.Interfaces.Configuration;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace IntegratedDigitalAPI.Controllers.Configuration
{
    [Route("api/[controller]")]
    [ApiController]
    public class ZoneController : ControllerBase
    {
        IZoneService _ZoneService;

        public ZoneController(IZoneService ZoneService)
        {
            _ZoneService = ZoneService;
        }

       

        [HttpGet]
        [ProducesResponseType(typeof(ZoneGetDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetZoneList()
        {
            return Ok(await _ZoneService.GetZoneList());
        }

        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddZone([FromBody] ZonePostDto ZoneDto)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _ZoneService.AddZone(ZoneDto));
            }
            else
            {
                return BadRequest();
            }
        }


        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdateZone(ZonePostDto ZoneDto)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _ZoneService.UpdateZone(ZoneDto));
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
