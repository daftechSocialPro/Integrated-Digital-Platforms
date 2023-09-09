using Implementation.Helper;
using IntegratedImplementation.DTOS.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Interfaces.Configuration
{
    public interface ICountryService
    {

        Task<List<SelectListDto>> GetCountryDropdownList();
        Task<ResponseMessage> AddCountry(CountryPostDto countryPost);
        Task<List<CountryGetDto>> GetCountryList();
        Task<ResponseMessage> UpdateCountry(CountryGetDto countryPost);
    }
}
