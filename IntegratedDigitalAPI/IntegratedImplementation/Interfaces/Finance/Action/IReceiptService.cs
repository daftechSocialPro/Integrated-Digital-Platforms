using Implementation.Helper;
using IntegratedDigitalAPI.DTOS.PM;
using IntegratedImplementation.DTOS.Finance.Action;

namespace IntegratedImplementation.Interfaces.Finance.Action
{
    public interface IReceiptService
    {
        Task<ResponseMessage> AddReceipt(AddReceiptDto addReceipt);
        Task<List<ProgressViewDto>> GetFinanceProgress(Guid employeeId);
        Task<List<ReceiptGetDto>> GetReceipts();
    }
}
