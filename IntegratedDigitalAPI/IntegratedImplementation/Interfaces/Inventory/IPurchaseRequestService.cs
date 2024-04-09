using Implementation.Helper;
using IntegratedImplementation.DTOS.Inventory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Interfaces.Inventory
{
    public interface IPurchaseRequestService
    {
        Task<ResponseMessage> AddPurchaseRequest(AddPurchaseRequestDto addPurchase);
        Task<List<PurchaseRequestListDto>> GetPendingRequests();
        Task<ResponseMessage> ApproveItems(List<ApprovePurchaseRequestDto> requestDtos);

        Task<List<ApprovedPurchaseRequestsDto>> GetApproveItems();

        Task<ResponseMessage> AddPerforma(AddPerformaDto addPerforma);

        Task<ResponseMessage> ApproveFinalRequest(ApprovePerformaDto approvePerforma);
    }
}
