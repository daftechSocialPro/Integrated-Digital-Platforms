
using Implementation.Helper;
using IntegratedDigitalAPI.DTOS.PM;
using IntegratedImplementation.DTOS.Configuration;
using IntegratedImplementation.DTOS.PM;
using System;
using static IntegratedDigitalAPI.Services.PM.PlanService;

namespace IntegratedDigitalAPI.Services.PM.Plan
{
    public interface IPlanService
    {
        public Task<ResponseMessage> CreatePlan(PlanDto plan);

        public  Task<ResponseMessage> UpdatePlan(PlanDto plan);

        public Task<List<PlanViewDto>> GetPlans(Guid? programId, int? year);

        public Task<List<SelectListDto>> GetPlansSelectList();

        public Task<PlanSingleViewDto> GetSinglePlan(Guid planId,int? year);

        public Task<GetStartEndDate> GetDateTime(Guid planId);

        public Task<ResponseMessage> DeleteProject(Guid planId);
        public Task<PlanPieChartPostDto> GetPlanPieCharts(Guid? planId,Guid? strategicPlanId , int quarter, int? year);
        public Task<PlanBarChartPostDto> GetPlanBarCharts(Guid? planId, Guid? strategicPlanId, int ? year);


        public Task<List<StrageicPlanReportDto>> GetStrategicPlanReport();


        //public Task<int> UpdatePrograms(Programs Programs);
        //public Task<List<ProgramDto>> GetPrograms();
        //public Task<List<SelectListDto>> GetProgramsSelectList();
    }
}
