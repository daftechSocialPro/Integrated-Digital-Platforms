using IntegratedImplementation.DTOS.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
        Task<List<SelectListDto>> GetProjectLocations();


    }
}
