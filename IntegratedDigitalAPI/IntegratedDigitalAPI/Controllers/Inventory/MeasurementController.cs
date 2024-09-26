using Implementation.Helper;
using Implementation.Interfaces.Inventory;
using IntegratedImplementation.DTOS.Inventory;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace ERPSystems.Controllers.Inventory
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class MeasurementController : ControllerBase
    {
        IMeasurementService _mesurementService;

        public MeasurementController(IMeasurementService measurementService)
        {
            _mesurementService = measurementService;
        }

        [HttpGet]
        [ProducesResponseType(typeof(MeasurementListDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetMeasurementList()
        {
           return Ok(await _mesurementService.GetMeasurementList());
        }


        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddMeasurement(AddMeasurementUnitDto measurementUnit)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _mesurementService.AddMeasurement(measurementUnit));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdateMeasurement(AddMeasurementUnitDto measurementUnit)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _mesurementService.UpdateMeasurement(measurementUnit));
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
