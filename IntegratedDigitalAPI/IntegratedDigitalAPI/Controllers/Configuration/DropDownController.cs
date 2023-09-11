using IntegratedImplementation.DTOS.Configuration;
using IntegratedImplementation.Interfaces.Configuration;
using IntegratedImplementation.Services.Configuration;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace IntegratedDigitalAPI.Controllers.Configuration
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class DropDownController : ControllerBase
    {
        IDropDownService _DropDownService;

        public DropDownController(IDropDownService DropDownService)
        {
            _DropDownService = DropDownService;
        }

        [HttpGet]
        [ProducesResponseType(typeof(SelectListDto), (int)HttpStatusCode.OK)]

        public async Task<IActionResult> GetCountryDropdownList()
        {
            return Ok(await _DropDownService.GetCountryDropdownList());
        }

        [HttpGet]
        [ProducesResponseType(typeof(SelectListDto), (int)HttpStatusCode.OK)]

        public async Task<IActionResult> GetRegionDropdownList(Guid CountryId)
        {
            return Ok(await _DropDownService.GetRegionDropdownList(CountryId));
        }

        [HttpGet]
        [ProducesResponseType(typeof(SelectListDto), (int)HttpStatusCode.OK)]

        public async Task<IActionResult> GetZoneDropdownList(Guid RegionId)
        {
            return Ok(await _DropDownService.GetZoneDropdownList(RegionId));
        }

        [HttpGet]
        [ProducesResponseType(typeof(SelectListDto), (int)HttpStatusCode.OK)]

        public async Task<IActionResult> GetEducationalFieldDropDown()
        {
            return Ok(await _DropDownService.GetEducationalFieldDropDown());
        }

        [HttpGet]
        [ProducesResponseType(typeof(SelectListDto), (int)HttpStatusCode.OK)]

        public async Task<IActionResult> GetEducationalLevelDropDown()
        {
            return Ok(await _DropDownService.GetEducationalLevelDropDown());
        }

        [HttpGet]
        [ProducesResponseType(typeof(SelectListDto), (int)HttpStatusCode.OK)]

        public async Task<IActionResult> GetDepartmentDropdownList()
        {
            return Ok(await _DropDownService.GetDepartmentDropdownList());
        }

        [HttpGet]
        [ProducesResponseType(typeof(SelectListDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetPositionDropdownList()
        {
            return Ok(await _DropDownService.GetPositionDropdownList());
        }

        [HttpGet]
        [ProducesResponseType(typeof(SelectListDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetLeaveTypeDropDownList()
        {
            return Ok(await _DropDownService.GetLeaveTypeDropdownList());
        }


    }
}
