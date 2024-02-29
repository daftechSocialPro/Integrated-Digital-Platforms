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
    public interface IFinanceLookupService
    {
        Task<ResponseMessage> AddFinanceLookup(FinanceLookupPostDto financeLookupPost);
        Task<List<FinanceLookupGetDto>> GetFinanceLookups();
        Task<ResponseMessage> UpdateFinanceLookup(FinanceLookupGetDto financeLookupGet);
    }
}
