using Implementation.Helper;
using IntegratedImplementation.DTOS.Inventory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Interfaces.Inventory
{
    public interface IStoreReceivalService
    {
        Task<List<StoreReceivalListDto>> GetStoreApprovedItems();
        Task<ResponseMessage> IssueStoreApprovedItems(StoreRequestIssueDto storeRequest);
        Task<List<ApprovedItemsDto>> GetEmployeesApprovedItems(string employeeId);
        Task<ResponseMessage> ReciveApprovedItems(ReceiveItems receiveItems);
        Task<List<EmployeeReceivedITemsDto>> GetEmployeeReceivedItems(string employeeId);
        Task<ResponseMessage> AdjustReceivedItems(AdjustReceivedITemsDto receivedITemsDto);
    }
}
