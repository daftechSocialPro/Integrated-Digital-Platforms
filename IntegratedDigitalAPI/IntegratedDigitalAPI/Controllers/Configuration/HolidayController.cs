using Implementation.Helper;
using IntegratedImplementation.DTOS.Configuration;
using IntegratedImplementation.Interfaces.Configuration;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace IntegratedDigitalAPI.Controllers.Configuration
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class HolidayController : ControllerBase
    {
        private readonly IHolidayService _holidayService;
        public HolidayController(IHolidayService holidayService)
        { 
            _holidayService = holidayService;
        }
      
        [HttpGet]
        [ProducesResponseType(typeof(HolidayListDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetHolidayList()
        {
            return Ok(await _holidayService.GetHolidayList());
        }

        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddHoliday(AddHolidayDto addHoliday)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _holidayService.AddHoliday(addHoliday));
            }
            else
            {
                return BadRequest();
            }
        }


        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdateHoliday(UpdateHolidayDto updateHoliday)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _holidayService.UpdateHoliday(updateHoliday));
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
