using Implementation.Helper;
using IntegratedDigitalAPI.DTOS.PM;
using IntegratedImplementation.DTOS.Finance.Action;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Interfaces.Finance.Action
{
    public interface IReceiptService
    {
        Task<ResponseMessage> AddReceipt(AddReceiptDto addReceipt);
        Task<List<ProgressViewDto>> GetFinanceProgress(Guid employeeId);
    }
}
