using Implementation.Helper;
using IntegratedImplementation.DTOS.Configuration;
using IntegratedImplementation.DTOS.HRM;
using IntegratedImplementation.Interfaces.Configuration;
using IntegratedImplementation.Interfaces.HRM;
using IntegratedImplementation.Services.HRM;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace IntegratedDigitalAPI.Controllers.HRM
{
    [Route("api/[controller]")]
    [ApiController]
    public class HrmSettingController : ControllerBase
    {

        IHrmSettingService _hrmSettingService;

        public HrmSettingController(IHrmSettingService hrmSettingService)
        {
            _hrmSettingService = hrmSettingService;
        }


        [HttpGet]
        [ProducesResponseType(typeof(HrmSettingDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetHrmSettingList()
        {
            return Ok(await _hrmSettingService.GetHrmSettings());
        }

        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddHrmSetting([FromBody] HrmSettingPostDto HrmSettingDto)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _hrmSettingService.AddHrmSetting(HrmSettingDto));
            }
            else
            {
                return BadRequest();
            }
        }


        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdateHrmSetting(HrmSettingDto HrmSettingDto)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _hrmSettingService.UpdateHrmSetting(HrmSettingDto));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [ProducesResponseType(typeof(PerformanceSettingDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetPerformanceSettings()
        {
            return Ok(await _hrmSettingService.GetPerformanceSettings());
        }

        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddPerformanceSetting([FromBody] PerformanceSettingDto performanceSetting)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _hrmSettingService.AddPerformanceSetting(performanceSetting));
            }
            else
            {
                return BadRequest();
            }
        }

    }
}
