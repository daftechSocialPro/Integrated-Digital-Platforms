using Implementation.Helper;
using IntegratedImplementation.DTOS.HRM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Interfaces.HRM
{
    public interface ILoanSettingService
    {
        Task<List<LoanSettingDto>> GetLoanSettings();

        Task<ResponseMessage> AddLoanSetting(AddLoanSettingDto addLoanSetting);

        Task<ResponseMessage> UpdateLoanSetting(UpdateLoanSettingDto updateLoanSetting);    

    }
}
