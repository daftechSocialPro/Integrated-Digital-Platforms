using Implementation.Helper;
using IntegratedImplementation.DTOS.Configuration;
using IntegratedImplementation.DTOS.HRM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Interfaces.HRM
{
    public interface IPositionService
    {
        Task<List<PositionGetDto>> GetPositionList();
        Task<ResponseMessage> AddPosition(PositionPostDto PositionPost);
        Task<ResponseMessage> UpdatePosition(PositionGetDto PositionUpdate);
    
    }
}
