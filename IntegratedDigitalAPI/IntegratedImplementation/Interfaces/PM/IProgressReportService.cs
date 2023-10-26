



using IntegratedImplementation.DTOS.PM;
using IntegratedInfrustructure.Model.HRM;
using IntegratedInfrustructure.Models.PM;
using Microsoft.EntityFrameworkCore;
using static IntegratedDigitalAPI.Services.PM.ProgressReport.ProgressReportService;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedDigitalAPI.Services.PM.ProgressReport
{
    public interface IProgressReportService
    {


        //public Task<PlanReportByProgramDto> PlanReportByProgram(string BudgetYear, string ReportBy);

        Task<PlanReportDetailDto> StructureReportByProgram(string BudgetYear, string ProgramId, string ReportBy);
         Task<PlannedReport> PlanReports(string BudgetYea, Guid selectStructureId, string ReportBy);
         Task<PlannedReport> StrategicPlanReport(string BudgetYea, Guid strategicPlanId, string ReportBy);
         Task<ProgresseReport> ProgresssReport(FilterationCriteria filterationCriteria);
        Task<ProgresseReportByStructure> GetProgressByStructure(int BudgetYea, Guid selectStructureId, string ReportBy);
        Task<PerfomanceReport> PerformanceReports(FilterationCriteria filterationCriteria);
        Task<List<ActivityProgressViewModel>> GetActivityProgress(Guid? activityId);
        Task<List<EstimatedCostDto>> GetEstimatedCost(Guid structureId, int budegtYear);
        Task<List<StaffWeeklyPlanDto>> GetStaffWeeklyPlans(FilterDateCriteriaDto filterDateCriteria);

    }
}
