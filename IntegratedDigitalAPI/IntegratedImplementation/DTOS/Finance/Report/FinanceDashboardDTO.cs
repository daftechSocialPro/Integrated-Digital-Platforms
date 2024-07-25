using IntegratedDigitalAPI.DTOS.PM;

namespace IntegratedImplementation.DTOS.Finance.Report;
public record FinanceDashboardDTO
{
    public int PendingProgress { get; set; }
    public int ApprovedProgress { get; set; }
    public int RejectedProgress { get; set; }
    public int TotalApprovedLoan { get; set; }
    public int TotalGivenLoan { get; set; }
    public int TotalPaidLoan { get; set; }
}

public record FinanceBarChartPostDto
{
    public string PlanName { get; set; }

    public List<ChartDataSet2> BudgetChartDataSets { get; set; }

}