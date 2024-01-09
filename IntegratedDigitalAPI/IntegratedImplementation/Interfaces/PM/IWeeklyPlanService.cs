using Implementation.Helper;
using IntegratedImplementation.DTOS.PM;
using IntegratedInfrustructure.Model.PM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Interfaces.PM
{
    public interface IWeeklyPlanService
    {

        Task<ResponseMessage> AddWeeklyPlan(WeeklyPlanDto weekplanDto);

        Task<List<WeeklyPlanDto>> GetWeeklyRequestedPlans ();

        Task<List<WeeklyPlanDto>> GetWeeklyPlans(Guid employeeId);
        Task<List<WeeklyPlanDto>> GetWeeklyPlans();
        Task<ResponseMessage> UpdateStatusWeeklyPlan(string WeeklyPlanStatus,Guid weklyPlanId,string remark);

        Task<ResponseMessage> UpdateWorkStatus(string workStatus);

    }
}
