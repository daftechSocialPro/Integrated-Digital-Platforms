using Implementation.Helper;
using IntegratedImplementation.DTOS.Inventory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Interfaces.Inventory
{
    public interface IStoreRequestService
    {
        Task<ResponseMessage> AddStoreRequest(AddStoreRequestDto addStoreRequest);
        Task<List<StoreRequestItems>> GetPendingStoreRequests();
        Task<ResponseMessage> ApproveStoreRequest(ApproveStoreRequest approveRequest);
        Task<ResponseMessage> RejectStoreRequest(RejectStoreRequest rejectRequest);
    }
}
