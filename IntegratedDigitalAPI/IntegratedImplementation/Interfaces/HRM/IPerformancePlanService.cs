using Implementation.Helper;
using IntegratedImplementation.DTOS.HRM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Interfaces.HRM
{
    public interface IPerformancePlanService
    {
        Task<List<PerformancePlanDto>> GetPerformancePlans();
        Task<ResponseMessage> AddPerformancePlan(AddPerformancePlanDto addPerformancePlan);
        Task<ResponseMessage> UpdatePerformancePlan(UpdateperformancePlanDto updatePerformancePlan);
        Task<ResponseMessage> AddPerformancePlanDetail(AddPerformancePlanDetailDto addPerformancePlan);
        Task<ResponseMessage> UpdatePerformancePlanDetail(UpdatePerfromancePlanDetailDto updatePerformancePlan);
    }
}
