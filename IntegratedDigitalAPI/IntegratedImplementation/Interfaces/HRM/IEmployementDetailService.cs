using Implementation.Helper;
using IntegratedImplementation.DTOS.Configuration;
using IntegratedImplementation.DTOS.HRM;

namespace IntegratedImplementation.Interfaces.HRM
{
    public interface IEmployementDetailService
    {

        public Task<List<ResignationRequestListDto>> GetResingationLists();
        public Task<ResponseMessage> RequestResignationLetter(ResignationRequestDto resignationRequest);
        public Task<ResponseMessage> ApproveResignationRequest(Guid requestId, Guid employeeId);
        public Task<List<ApprovedResignationListDto>> ApprovedResignationListDto();
        public Task<ResponseMessage> TerminateRequester(Guid requestId);
        public Task<ResponseMessage> TerminateEmployee(Guid employementDetailId, string remark, bool blacListed, bool hasSeverance);
        public Task<List<TerminatedEmployeesDto>> TerminatedEmployeesList();

        public Task<ResponseMessage> RehireEmployee(RehireEmployeeDto rehireEmployee);

        public Task<List<EmployeeSupervisorsDto>> GetEmployeeSupervisors();
        public Task<List<SelectListDto>> GetToBeSupervisedEmployees();
        public Task<EmployeeSupervisorsDto> GetSupervisorsByEmployee(Guid employeeId);
        public Task<ResponseMessage> AssignSupervisor(AssignSupervisorDto assignSupervisor);
        public Task<ResponseMessage> DeleteSupervisee(Guid employeeId);


        public Task<List<EmployeeDisciplinaryListDto>> GetEmployeeDisciplinaries();
        public Task<ResponseMessage> AddDisciplinaryCase(AddDisciplinaryCaseDto addDisciplinary);
        public Task<ResponseMessage> ApproveCase(ApproveDisciplinaryCase approveDisplinary);


        public Task<List<EmployeeBenefitListDto>> GetEmployeeBenefits(Guid employeeId);
        public Task<ResponseMessage> AddEmployeeBenefit(AddEmployeeBenefitDto addEmployeeBenefit);
        public Task<ResponseMessage> DeleteEmployeeBenefit(Guid benefitId);
        public Task<List<ContractEndEmployeesDto>> GetContractEndEmployees();

        public Task<ResponseMessage> ExtendContract(ExtendContractDto extendContract);
        public Task<ContractExtentionLetterDto> GetContractExtentionLetter(Guid employeeId);

    }
}
