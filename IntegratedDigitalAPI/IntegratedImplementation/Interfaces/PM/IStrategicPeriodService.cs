using Implementation.Helper;
using IntegratedImplementation.DTOS.PM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Interfaces.PM
{
    public interface IStrategicPeriodService
    {
        Task<List<StrategicPeriodGetDto>> GetStrategicPeriodList();
        Task<ResponseMessage> AddStrategicPeriod(StrategicPeriodPostDto strategicPeriodPost);
        Task<ResponseMessage> UpdateStrategicPeriod(StrategicPeriodGetDto strategicPeriodGet);
        Task<ResponseMessage> DeleteStrategicPeriod(Guid id);
    }
}

