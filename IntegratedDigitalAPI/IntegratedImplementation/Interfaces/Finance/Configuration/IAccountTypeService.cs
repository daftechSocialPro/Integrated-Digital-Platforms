using Implementation.Helper;
using IntegratedImplementation.DTOS.Finance.Configuration;
using IntegratedImplementation.DTOS.PM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Interfaces.Finance.Configuration
{
    public interface IAccountTypeService
    {

        Task<ResponseMessage> AddAccountType( AccountTypePostDto accountTypePost);
        Task<List<AccountTypeGetDto>> GetAccountTypes();
        Task<ResponseMessage> UpdateAccountType(AccountTypeGetDto BudgetYearPost);
    }
}
