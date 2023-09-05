using Implementation.Helper;
using IntegratedImplementation.DTOS.Configuration;
using IntegratedImplementation.DTOS.HRM;
using IntegratedImplementation.Interfaces.HRM;
using IntegratedImplementation.Services.HRM;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace IntegratedDigitalAPI.Controllers.HRM
{
    [Route("api/[controller]")]
    [ApiController]
    public class PositionController : ControllerBase
    {
        IPositionService _PositionService;

        public PositionController(IPositionService PositionService)
        {
            _PositionService = PositionService;
        }

        [HttpGet]
        [ProducesResponseType(typeof(PositionGetDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetPositionList()
        {
            return Ok(await _PositionService.GetPositionList());
        }

        [HttpGet("getPositionDropdown")]
        [ProducesResponseType(typeof(SelectListDto), (int)HttpStatusCode.OK)]

        public async Task<IActionResult> GetPositionDropdownList()
        {
            return Ok(await _PositionService.GetPositionDropdownList());
        }



        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddPosition([FromBody] PositionPostDto PositionDto)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _PositionService.AddPosition(PositionDto));
            }
            else
            {
                return BadRequest();
            }
        }


        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdatePosition(PositionGetDto PositionDto)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _PositionService.UpdatePosition(PositionDto));
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
