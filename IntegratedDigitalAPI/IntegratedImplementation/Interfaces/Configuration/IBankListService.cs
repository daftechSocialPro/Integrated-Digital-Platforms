using Implementation.Helper;
using IntegratedImplementation.DTOS.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Interfaces.Configuration
{
    public interface IBankListService
    {
        Task<List<BankListDto>> GetBankList();
        Task<ResponseMessage> AddBank(AddBankDto addBank);
        Task<ResponseMessage> UpdateBank(UpdateBankDto updateBank);
    }
}
