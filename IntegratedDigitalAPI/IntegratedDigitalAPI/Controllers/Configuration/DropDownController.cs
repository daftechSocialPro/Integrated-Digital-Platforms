﻿using IntegratedImplementation.DTOS.Configuration;
using IntegratedImplementation.DTOS.Inventory;
using IntegratedImplementation.Interfaces.Configuration;
using IntegratedImplementation.Services.Configuration;
using IntegratedInfrustructure.Models.Inventory;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using static IntegratedInfrustructure.Data.EnumList;

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
        public async Task<IActionResult> GetIndicatorByStrategicPlanId(Guid strategicPlanId)
        {
            return Ok(await _DropDownService.GetIndicatorsByStrategicPlanId(strategicPlanId));
        }

        [HttpGet]
        [ProducesResponseType(typeof(SelectListDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetProjectFundSources()
        {
            return Ok(await _DropDownService.GetProjectFundSources());
        } 
        
        
        [HttpGet]
        [ProducesResponseType(typeof(SelectListDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetProjectDropDowns()
        {
            return Ok(await _DropDownService.GetProjectDropDowns());
        }


        [HttpGet]
        [ProducesResponseType(typeof(SelectListDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetActivityByProjectid(Guid projectId)
        {
            return Ok(await _DropDownService.GetActivityByProjectid(projectId));
        }


        [HttpGet]
        [ProducesResponseType(typeof(SelectListDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetProjectFundSourcesForActivity(Guid projectId)
        {
            return Ok(await _DropDownService.GetProjectFundSourcesForActivity(projectId));
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



        [HttpGet]
        [ProducesResponseType(typeof(SelectListDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetShiftDropDown()
        {
            return Ok(await _DropDownService.GetShiftDropDown());
        }

        [HttpGet]
        [ProducesResponseType(typeof(ItemDropDownDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetItemDropDown()
        {
            return Ok(await _DropDownService.GetItemDropDown());
        }

        [HttpGet]
        [ProducesResponseType(typeof(ItemDropDownDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetItemByRequest(string StoreRequestId)
        {
            return Ok(await _DropDownService.GetItemByRequest(StoreRequestId));
        }

        [HttpGet]
        [ProducesResponseType(typeof(SelectListDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetPurchaseRequestByItem(string ItemId)
        {
            return Ok(await _DropDownService.GetPurchaseRequestByItem(ItemId));
        }

        [HttpGet]
        [ProducesResponseType(typeof(SelectListDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetPurchaseRequestByDropDown()
        {
            return Ok(await _DropDownService.GetPurchaseRequestByDropDown());
        }

        [HttpGet]
        [ProducesResponseType(typeof(SelectListDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetStoreRequestDropDown()
        {
            return Ok(await _DropDownService.GetStoreRequestDropDown());
        }

        [HttpGet]
        [ProducesResponseType(typeof(SelectListDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetVendorDropDown()
        {
            return Ok(await _DropDownService.GetVendorDropDown());
        }

        [HttpGet]
        [ProducesResponseType(typeof(SelectListDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetVendorDropDownByrequestId(Guid purchaseRequestId)
        {
            return Ok(await _DropDownService.GetVendorDropDownByrequestId(purchaseRequestId));
        }

        [HttpGet]
        [ProducesResponseType(typeof(SelectListDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetMeasurementListByType(MeasurementType measurementType)
        {
            return Ok(await _DropDownService.GetMeasurementListByType(measurementType));
        }
        [HttpGet]
        [ProducesResponseType(typeof(SelectListDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetFiscalYears()
        {
            return Ok(await _DropDownService.GetFiscalYears());
        }
        [HttpGet]
        [ProducesResponseType(typeof(SelectListDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetAccountTypeDropDown()
        {
            return Ok(await _DropDownService.GetAccountTypeDropDown());
        }
        [HttpGet]
        [ProducesResponseType(typeof(SelectListDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetChartOfAccountsDropDown()
        {
            return Ok(await _DropDownService.GetChartOfAccountsDropDown());
        }

        [HttpGet]
        [ProducesResponseType(typeof(SelectListDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetSubsidaryAccount(Guid ChartOfAccountId)
        {
            return Ok(await _DropDownService.GetSubsidaryAccount(ChartOfAccountId));
        }

        [HttpGet]
        [ProducesResponseType(typeof(SelectListDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetAccountingYear()
        {
            return Ok(await _DropDownService.GetAccountingYear());
        }

        [HttpGet]
        [ProducesResponseType(typeof(SelectListDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetAccountingPeriodDropDown()
        {
            return Ok(await _DropDownService.GetAccountingPeriodDropDown());
        }

        [HttpGet]
        [ProducesResponseType(typeof(SelectListDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetTrainingList()
        {
            return Ok(await _DropDownService.GetTrainingList());
        }

        [HttpGet]
        [ProducesResponseType(typeof(SelectListDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetVendorAccount(Guid vendorId)
        {
            return Ok(await _DropDownService.GetVendorAccount(vendorId));
        }

        [HttpGet]
        [ProducesResponseType(typeof(SelectListDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetEmployeeAccount(Guid employeeId)
        {
            return Ok(await _DropDownService.GetEmployeeAccount(employeeId));
        }
    }
}
