

using IntegratedDigitalAPI.DTOS.PM;
using IntegratedImplementation.DTOS.Configuration;

namespace IntegratedDigitalAPI.Services.PM.Commite
{
    public interface ICommiteService
    {
        public Task<List<CommiteListDto>> GetCommiteLists();
        public Task<int> AddCommite(AddCommiteDto addCommiteDto);
        public Task<int> UpdateCommite(UpdateCommiteDto updateCommite);
        public Task<List<SelectListDto>> GetNotIncludedEmployees(Guid CommiteId);

        public Task<int> AddEmployeestoCommitte(CommiteEmployeesdto commiteEmployeesdto);

        public Task<int> RemoveEmployeestoCommitte(CommiteEmployeesdto commiteEmployeesdto);
        public Task<List<SelectListDto>> GetSelectListCommittee();
        public Task<List<SelectListDto>> GetCommiteeEmployees(Guid comitteId);
    }
}
