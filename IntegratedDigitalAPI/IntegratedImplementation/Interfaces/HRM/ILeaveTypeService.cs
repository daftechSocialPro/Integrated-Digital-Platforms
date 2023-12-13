using Implementation.Helper;
using IntegratedImplementation.DTOS.Configuration;
using IntegratedImplementation.DTOS.HRM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Interfaces.HRM
{
    public interface ILeaveTypeService
    {
        Task<List<LeaveTypeGetDto>> GetLeaveTypeList();
        Task<ResponseMessage> AddLeaveType(LeaveTypePostDto LeaveTypePost);
        Task<ResponseMessage> UpdateLeaveType(LeaveTypeGetDto LeaveTypeUpdate);

        Task<ResponseMessage> AddLeaveDetail(AddLeaveDetailDto addLeaveDetail);
        Task<ResponseMessage> UpdateLeaveDetail(UpdateLeaveDetailDto updateLeaveDetail);

        //

        Task<List<LeavePlanSettingGetDto>> GetEmployeeLeavePlan(Guid employeeId);
        Task<List<LeavePlanSettingGetDto>> GetEmployeeLeavePlans();
        Task<ResponseMessage> AddEmployeeLeavePlan(LeavePlanSettingPostDto leavePlanSettingPost);
        Task<ResponseMessage> UpdateEmployeeLeavePlan(LeavePlanSettingUpdateDto leaveplan);

        //Task<ResponseMessage> DeleteEmployee(Guid employeeSuretyId);

    }
}
