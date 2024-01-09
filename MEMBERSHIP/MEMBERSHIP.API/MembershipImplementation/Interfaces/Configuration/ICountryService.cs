using Implementation.Helper;
using MembershipImplementation.DTOS.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MembershipImplementation.Interfaces.Configuration
{
    public interface ICountryService
    {
        Task<ResponseMessage> AddCountry(CountryPostDto countryPost);
        Task<List<CountryGetDto>> GetCountryList();
        Task<ResponseMessage> UpdateCountry(CountryGetDto countryPost);

        Task<ResponseMessage> DeleteCountry(Guid countryId);
    }
}
