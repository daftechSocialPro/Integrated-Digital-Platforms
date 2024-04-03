using Implementation.Helper;
using IntegratedImplementation.DTOS.Finance.Action;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Interfaces.Finance.Action
{
    public interface IBegnningBalanceService
    {
        Task<ResponseMessage> GetChartsForBegnning(Guid PeriodId);

        Task<ResponseMessage> AddBegnningBalance(AddBegnningBalanceDto addBegnningBalance);

    }
}
