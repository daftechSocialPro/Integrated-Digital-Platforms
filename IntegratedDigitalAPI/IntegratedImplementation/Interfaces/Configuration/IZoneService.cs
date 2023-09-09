using Implementation.Helper;
using IntegratedImplementation.DTOS.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Interfaces.Configuration
{
    public interface IZoneService
    {

        Task<List<SelectListDto>> GetZoneDropdownList(Guid countryId);

        Task<ResponseMessage> AddZone(ZonePostDto ZonePost);
        Task<List<ZoneGetDto>> GetZoneList();
        Task<ResponseMessage> UpdateZone(ZonePostDto ZonePost);
    }
}
