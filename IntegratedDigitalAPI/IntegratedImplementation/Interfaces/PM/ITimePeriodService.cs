using Implementation.Helper;
using IntegratedImplementation.DTOS.HRM;
using IntegratedImplementation.DTOS.PM;
using IntegratedInfrustructure.Model.PM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Interfaces.PM
{
    public interface ITimePeriodService
    {

        Task<List<ReportingPeriodGetDto>> GetReportingPeriodList();
        Task<ResponseMessage> AddReportingPeriod(ReportingPeriodPostDto periodPost);
        Task<ResponseMessage> UpdateReportingPeriod(ReportingPeriodGetDto periodGet);


        Task<List<BudgetYearDto>> GetBudgetYears();
        Task<ResponseMessage> AddBudgetYears(BudgetYearDto budgetYear);
        Task<ResponseMessage> UpdateBudgetYears(BudgetYearDto budgetYear);







    }
}
