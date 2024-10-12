using Implementation.Helper;
using IntegratedImplementation.DTOS.HRM;

namespace IntegratedImplementation.Interfaces.HRM
{
    public interface IEmployeeDocumentService
    {
        Task<ResponseMessage> Add(EmployeeDocumentsPostDTO employeeDocumentsPost);
        Task<List<EmployeeDocumentsGetDTO>> GetEmployeeDocumentById(Guid personId);
        Task<ResponseMessage> DeleteEmployeeFile(Guid employeeDocumentId);
        Task<ResponseMessage> UpdateEmployeeFile(EmployeeDocumentsGetDTO employeeDocumentsPost);
    }
}
