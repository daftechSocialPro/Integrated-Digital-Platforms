using Implementation.Helper;
using IntegratedImplementation.DTOS.Configuration;

namespace IntegratedImplementation.Interfaces.Configuration
{
    public interface IDocumentTypeService
    {
        Task<ResponseMessage> Add(DocumentTypePostDTO driverDocumentTypePost);
        Task<List<DocumentTypeGetDTO>> GetAll();
        Task<ResponseMessage> Update(DocumentTypeGetDTO driverDocumentTypeGet);
    }
}
