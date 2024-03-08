using Implementation.Helper;
using IntegratedImplementation.DTOS.Finance.Configuration;
using IntegratedImplementation.DTOS.HRM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Interfaces.Finance.Configuration
{
    public interface IPayrollSettingService
    {
      
        Task<List<GeneralPayrollSettingListDto>> GetGeneralPayrollSettings();
        Task<ResponseMessage> SaveGeneralPayrollSetting(GeneralPayrollSettingDto addPayrollSetting);

        Task<List<IncomeTaxDto>> GetIncomeTax();
        Task<ResponseMessage> AddIncomeTax(IncomeTaxDto addIncomeTax);
        Task<ResponseMessage> UpdateIncomeTax(IncomeTaxDto updateIncomeTax);


        Task<List<BenefitPayrollDto>> GetBenefitPayrolls();
        Task<ResponseMessage> AddBenefitPayroll(AddBenefitPayroll addBenefitPayroll);
    }
}
