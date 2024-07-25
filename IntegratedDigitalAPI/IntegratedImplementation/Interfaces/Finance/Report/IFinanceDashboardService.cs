using IntegratedImplementation.DTOS.Finance.Report;

namespace IntegratedImplementation.Interfaces.Finance.Report;
public interface IFinanceDashboardService
{
    Task<FinanceBarChartPostDto> GetDashboardChart(Guid planId);
    Task<FinanceDashboardDTO> GetDashboardData();
}

