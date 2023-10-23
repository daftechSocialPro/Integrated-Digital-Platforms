


using Implementation.Helper;
using IntegratedImplementation.DTOS.Configuration;
using IntegratedImplementation.Interfaces.Configuration;
using IntegratedImplementation.Services.Configuration;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace IntegratedDigitalAPI.Controllers.Configuration
{
    [Route("api/[controller]")]
    [ApiController]
    public class UnitOfMeasurmentController : ControllerBase
    {

        private readonly IUnitOfMeasurmentService _unitOfMeasurmentService;
        public UnitOfMeasurmentController(IUnitOfMeasurmentService unitOfMeasurmentService)
        {

            _unitOfMeasurmentService = unitOfMeasurmentService;

        }

        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddUnitOfMeasurment([FromBody] UnitOfMeasurmentPostDto unitOfMeasurment)
        {
            if (ModelState.IsValid)
            {
                return Ok(_unitOfMeasurmentService.CreateUnitOfMeasurment(unitOfMeasurment));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [ProducesResponseType(typeof(RegionGetDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetUnitOfMeasurment()
        {
            return Ok(await _unitOfMeasurmentService.GetUnitOfMeasurment());
        }   


        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdateUnitOfMeasurment(UnitOfMeasurmentGetDto unitOfMeasurment)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _unitOfMeasurmentService.UpdateUnitOfMeasurment(unitOfMeasurment));
            }
            else
            {
                return BadRequest();
            }
        }


    }
}
