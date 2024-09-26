using Implementation.Helper;
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
        Task<ResponseMessage> AddRegion(RegionPostDto RegionPost);
        Task<List<RegionGetDto>> GetRegionList();
        Task<ResponseMessage> UpdateRegion(RegionPostDto RegionPost);
    }
}
