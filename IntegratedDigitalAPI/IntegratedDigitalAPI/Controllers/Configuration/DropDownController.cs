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

        [HttpGet]
        [ProducesResponseType(typeof(SelectListDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetHrmSettingDropDownList()
        {
            return Ok(await _DropDownService.GetGeneralHRMSettingList());
        }

        [HttpGet]
        [ProducesResponseType(typeof(SelectListDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetLoanTypeDropDown()
        {
            return Ok(await _DropDownService.GetLoanTypeDropDown());
        }

        [HttpGet]
        [ProducesResponseType(typeof(SelectListDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetEmployeeDropDown()
        {
            return Ok(await _DropDownService.GetEmployeeSelectList());
        }

        [HttpGet]
        [ProducesResponseType(typeof(SelectListDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetUnitOfMeasurment()
        {
            return Ok(await _DropDownService.GetUnitofMeasurment());
        }



        [HttpGet]
        [ProducesResponseType(typeof(SelectListDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetStrategicPlans()
        {
            return Ok(await _DropDownService.GetStrategicPlans());
        }

        [HttpGet]
        [ProducesResponseType(typeof(SelectListDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetProjectLocations()
        {
            return Ok(await _DropDownService.GetProjectLocations());
        }


        [HttpGet]
        [ProducesResponseType(typeof(SelectListDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetBenefitDropDowns()
        {
            return Ok(await _DropDownService.GetBenefitDropDowns());
        }

        [HttpGet]
        [ProducesResponseType(typeof(BankSelectList), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetBankDropDowns()
        {
            return Ok(await _DropDownService.GetBankDropDowns());
        }






    }
}
