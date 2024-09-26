using IntegratedImplementation.DTOS.Configuration;
using IntegratedImplementation.DTOS.Inventory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.Interfaces.Configuration
{
    public interface IDropDownService
    {
        Task<List<SelectListDto>> GetCountryDropdownList();
        Task<List<SelectListDto>> GetRegionDropdownList(Guid countryId);
        Task<List<SelectListDto>> GetZoneDropdownList(Guid countryId);
        Task<List<SelectListDto>> GetEducationalFieldDropDown();
        Task<List<SelectListDto>> GetEducationalLevelDropDown();
        Task<List<SelectListDto>> GetDepartmentDropdownList();
        Task<List<SelectListDto>> GetPositionDropdownList();
        Task<List<SelectListDto>> GetLeaveTypeDropdownList();
        Task<List<SelectListDto>> GetGeneralHRMSettingList();
        Task<List<SelectListDto>> GetLoanTypeDropDown();

        Task<List<SelectListDto>> GetUnitofMeasurment();
        Task<List<SelectListDto>> GetEmployeeSelectList();

        Task<List<SelectListDto>> GetStrategicPlans();
        Task<List<SelectListDto>> GetIndicatorsByStrategicPlanId(Guid strategicPlanId);
        Task<List<SelectListDto>> GetProjectFundSources();
        Task<List<SelectListDto>> GetProjectDropDowns();
        Task<List<SelectListDto>> GetActivityByProjectid(Guid projectId);
        Task<List<SelectListDto>> GetProjectFundSourcesForActivity(Guid projectId);

        Task<List<SelectListDto>> GetBenefitDropDowns();
        Task<List<BankSelectList>> GetBankDropDowns();

        Task<List<SelectListDto>> GetShiftDropDown();

        Task<List<ItemDropDownDto>> GetItemDropDown();
        Task<List<ItemDropDownDto>> GetItemByRequest(string StoreRequestId);
        Task<List<SelectListDto>> GetMeasurementListByType(MeasurementType measurmentType);
        Task<List<SelectListDto>> GetPurchaseRequestByItem(string itemId);
        Task<List<SelectListDto>> GetPurchaseRequestByDropDown();
        Task<List<SelectListDto>> GetStoreRequestDropDown();
        Task<List<SelectListDto>> GetVendorDropDown();
        Task<List<SelectListDto>> GetVendorDropDownByrequestId(Guid purchaseRequestId);

        Task<List<SelectListDto>> GetFiscalYears();
        Task<List<SelectListDto>> GetAccountTypeDropDown();
        Task<List<SelectListDto>> GetAccountingYear();
        Task<List<SelectListDto>> GetAccountingPeriodDropDown();
        Task<List<SelectListDto>> GetChartOfAccountsDropDown();
        Task<List<SelectListDto>> GetSubsidaryAccount(Guid ChartOfAccountId);
        Task<List<SelectListDto>> GetTrainingList();

        Task<List<SelectListDto>> GetVendorAccount(Guid vendorId);
        Task<List<SelectListDto>> GetEmployeeAccount(Guid employeeId);

    }
}
