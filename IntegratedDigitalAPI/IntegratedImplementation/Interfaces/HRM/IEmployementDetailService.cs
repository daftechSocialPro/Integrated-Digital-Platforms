using Implementation.Helper;
using IntegratedImplementation.DTOS.HRM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Interfaces.HRM
{
    public interface IEmployementDetailService
    {

        public Task<List<ResignationRequestListDto>> GetResingationLists();
        public Task<ResponseMessage> RequestResignationLetter(ResignationRequestDto resignationRequest);
        public Task<ResponseMessage> ApproveResignationRequest(Guid requestId, Guid employeeId);
        public Task<List<ApprovedResignationListDto>> ApprovedResignationListDto();
        public Task<ResponseMessage> TerminateRequester(Guid requestId);
        public Task<ResponseMessage> TerminateEmployee(Guid employementDetailId, string remark, bool blacListed);
        public Task<List<TerminatedEmployeesDto>> TerminatedEmployeesList();


    }
}
