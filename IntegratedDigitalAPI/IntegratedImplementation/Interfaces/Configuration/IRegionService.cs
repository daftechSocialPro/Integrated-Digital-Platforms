using IntegratedImplementation.DTOS.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Interfaces.Configuration
{
    public interface IRegionService
    {
        Task<List<SelectListDto>> GetRegionDropdownList(Guid countryId);
    }
}
