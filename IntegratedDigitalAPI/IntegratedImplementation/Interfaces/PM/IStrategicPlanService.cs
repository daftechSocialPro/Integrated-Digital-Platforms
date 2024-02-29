using Implementation.Helper;
using IntegratedDigitalAPI.DTOS.PM;
using IntegratedImplementation.DTOS.HRM;
using IntegratedImplementation.DTOS.PM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Interfaces.PM
{
    public interface IStrategicPlanService
    {
        Task<List<StrategicPlanGetDto>> GetStrategicPlanList();
        Task<ResponseMessage> AddStrategicPlan(StrategicPlanPostDto strategicPlansPost);
        Task<ResponseMessage> UpdateStrategicPlan(StrategicPlanGetDto strategicPlansPost);

        Task<List<ActivityGroup>> GetStrategicPlanReport(Guid strategicPlanId);


        Task<List<ActivityViewDto>> GetActivitiesFromProject(Guid projectId);
        

    }
}
