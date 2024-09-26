using MembershipImplementation.DTOS.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MembershipImplementation.Interfaces.Configuration
{
    public interface IDropDownService
    {
        Task<List<SelectListDto>> GetCountryDropdownList();
        Task<List<SelectListDto>> GetRegionDropdownList(string countryType);
        Task<List<SelectListDto>> GetZoneDropdownList(Guid regionId);
        Task<List<SelectListDto>> GetEducationalFieldDropDown();
        Task<List<SelectListDto>> GetEducationalLevelDropDown();
        Task<List<SelectListDto>> GetMembershipTypesDropDown(string category);


    }
}
