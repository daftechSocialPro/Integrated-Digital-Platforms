using IntegratedDigitalAPI.DTOS.PM;
using IntegratedImplementation.DTOS.Finance.Report;
using IntegratedImplementation.Interfaces.Finance.Report;
using IntegratedInfrustructure.Data;
using IntegratedInfrustructure.Model.PM;
using Microsoft.EntityFrameworkCore;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.Services.Finance.Report
{
    public class FinanceDashboardService : IFinanceDashboardService
    {
        private readonly ApplicationDbContext _dBContext;

        public FinanceDashboardService(ApplicationDbContext dbContext)
        {
            _dBContext = dbContext;
        }

        public async Task<FinanceDashboardDTO> GetDashboardData()
        {
            FinanceDashboardDTO dashboardData = new FinanceDashboardDTO();

            dashboardData.PendingProgress = await _dBContext.ActivityProgresses.CountAsync(x => x.IsApprovedByFinance == ApprovalStatus.PENDING);
            dashboardData.ApprovedProgress = await _dBContext.ActivityProgresses.CountAsync(x => x.IsApprovedByFinance == ApprovalStatus.APPROVED);
            dashboardData.RejectedProgress = await _dBContext.ActivityProgresses.CountAsync(x => x.IsApprovedByFinance == ApprovalStatus.REJECTED);
            dashboardData.TotalGivenLoan = await _dBContext.EmployeeLoans.CountAsync(x => x.LoanStatus == LoanStatus.GIVEN);
            dashboardData.TotalApprovedLoan = await _dBContext.EmployeeLoans.CountAsync(x => x.LoanStatus == LoanStatus.APPROVED);
            dashboardData.TotalPaidLoan = await _dBContext.EmployeeLoans.CountAsync(x => x.LoanStatus == LoanStatus.PAID);
            return dashboardData;
        }

        public async Task<FinanceBarChartPostDto> GetDashboardChart(Guid planId)
        {
            List<Project> projects;

            if (planId == Guid.Parse("30fc30dc-eb56-4f40-9510-54ad983e759a"))
            {
                projects = await _dBContext.Projects.Include(x => x.Tasks).ToListAsync();
            }
            else
            {
                projects = await _dBContext.Projects.Where(x => x.Id == planId).Include(x => x.Tasks).ToListAsync();
            }

            double totalPlannedBudget = 0;
            double totalActualBudget = 0;

            foreach (var project in projects)
            {
                foreach (var task in project.Tasks)
                {
                    var activities = await _dBContext.ActivitiesParents
                        .Where(x => x.TaskId == task.Id)
                        .Join(_dBContext.Activities, a => a.Id, e => e.ActivityParentId, (a, e) => e)
                        .ToListAsync();

                    foreach (var activity in activities)
                    {
                        totalPlannedBudget += activity.PlanedBudget;

                        double actualBudget = await _dBContext.ActivityProgresses
                            .Where(x => x.ActivityId == activity.Id && x.IsApprovedByFinance == EnumList.ApprovalStatus.APPROVED)
                            .SumAsync(x => x.ActualBudget);

                        totalActualBudget += actualBudget;
                    }
                }
            }

            var chartDataSet = new ChartDataSet2
            {
                Label = "Overall Budget",
                Data = new DashData
                {
                    Planned = (float)totalPlannedBudget,
                    Actual = (float)totalActualBudget
                }
            };

            return new FinanceBarChartPostDto
            {
                PlanName = planId == Guid.Parse("30fc30dc-eb56-4f40-9510-54ad983e759a") ? "ALL" : projects.Any() ? projects.FirstOrDefault()?.ProjectName ?? "" : "",
                BudgetChartDataSets = new List<ChartDataSet2> { chartDataSet }
            };
        }

    }
}
