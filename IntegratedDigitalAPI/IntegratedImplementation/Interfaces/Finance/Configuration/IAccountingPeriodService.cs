using Implementation.Helper;
using IntegratedImplementation.DTOS.Finance.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Interfaces.Finance.Configuration
{
    public interface IAccountingPeriodService
    {
        Task<List<AccountingPeriodDto>> GetAccountingPeriod();

        Task<ResponseMessage> AddAccountingPeriod(AddAccountingPeriodDto addAccountingPeriod);
    }
}
