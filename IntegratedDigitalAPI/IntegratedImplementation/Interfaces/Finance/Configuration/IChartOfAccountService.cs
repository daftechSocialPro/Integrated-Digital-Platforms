using Implementation.Helper;
using IntegratedImplementation.DTOS.Finance.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Interfaces.Finance.Configuration
{
    public interface IChartOfAccountService
    {
        Task<List<ChartOfAccountDto>> GetChartOfAccounts();
        Task<ResponseMessage> AddChartOfAccount(AddChartOfAccountDto chartOfAccount);
        Task<ResponseMessage> UpdateChartOfAccount(UpdateChartOfAccountDto chartOfAccount);

        Task<ResponseMessage> AddSubsidiaryAccount(AddSubsidiaryAccount addSubsidiaryAccount);
        Task<ResponseMessage> UpdateSubsidiaryAccount(UpdateSubsidiaryAccount updateSubsidiaryAccount);

        Task<ResponseMessage> ChangeChartOfAccountStatus(Guid accountId);
        Task<ResponseMessage> ChangeSubsidiaryAccountStatus(Guid subsidiaryId);
    }
}
