using Implementation.Helper;
using IntegratedImplementation.DTOS.Configuration;
using IntegratedImplementation.DTOS.PM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Interfaces.PM
{
    public interface IBudgetYearService
    {
        Task<ResponseMessage> AddBudgetYear(BudgetYearDto BudgetYearPost);
        Task<List<BudgetYearDto>> GetBudgetYearList();
        Task<ResponseMessage> UpdateBudgetYear(BudgetYearDto BudgetYearPost);
    }
}
