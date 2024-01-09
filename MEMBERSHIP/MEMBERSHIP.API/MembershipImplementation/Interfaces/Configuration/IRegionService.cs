using Implementation.Helper;
using MembershipImplementation.DTOS.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MembershipImplementation.Interfaces.Configuration
{
    public interface IRegionService
    {
        Task<ResponseMessage> AddRegion(RegionPostDto RegionPost);
        Task<List<RegionGetDto>> GetRegionList();
        Task<ResponseMessage> UpdateRegion(RegionPostDto RegionPost);

        Task<ResponseMessage> DeleteRegion(Guid regionId);
    }
}
