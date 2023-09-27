using Implementation.Helper;
using IntegratedImplementation.DTOS.HRM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Interfaces.HRM
{
    public interface ILeaveManagementService
    {
        Task<ResponseMessage> AddLeaveBalance(AddLeaveBalanceDto addLeaveBalance);
        Task<ResponseMessage> AddLeaveRequest(LeaveRequestDto leaveRequestDto);
        Task<ResponseMessage> ApproveRequest(Guid leaveId, Guid employeeId);
        Task<ResponseMessage> RejectRequest(Guid leaveId, string remark);
        Task<List<LeavesTakenDto>> GetEmployeeLeaves(Guid employeeId);
        Task<List<LeavesTakenDto>> GetLeaveRequests();

        Task<LeavesTakenDto> GetSingleRequest(Guid Id);
        Task<AnnualLeaveBalanceDto> GetAnnualLeaveBalance(Guid employeeId);


    }
}
