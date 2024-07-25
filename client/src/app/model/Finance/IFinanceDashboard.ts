import { ChartDataSet } from "../PM/PlansDto"

export interface FinanceDashboardDTO
{
    pendingProgress : number
    approvedProgress : number
    rejectedProgress : number
    totalApprovedLoan : number
    totalGivenLoan : number
    totalPaidLoan : number
}

export interface FinanceBarChartPostDto
{
    planName : string

    budgetChartDataSets : ChartDataSet[]

}

