using Implementation.Helper;
using IntegratedImplementation.DTOS.Finance.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Interfaces.Finance.Configuration
{
    public interface ITaxRateService
    {
        Task<ResponseMessage> AddTaxRate(AddTaxRateDto addTaxRate);
        Task<List<TaxRateDto>> GetTaxRate();
    }
}
