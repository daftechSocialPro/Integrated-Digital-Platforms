using MembershipImplementation.DTOS.Configuration;
using MembershipImplementation.Interfaces.Configuration;
using MembershipImplementation.Services.Configuration;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace MembershipDigitalAPI.Controllers.Configuration
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

        public async Task<IActionResult> GetRegionDropdownList(string type)
        {
            return Ok(await _DropDownService.GetRegionDropdownList(type));
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

        public async Task<IActionResult> GetMembershipDropDown(string category)
        {
            return Ok(await _DropDownService.GetMembershipTypesDropDown(category));
        }


    }
}
