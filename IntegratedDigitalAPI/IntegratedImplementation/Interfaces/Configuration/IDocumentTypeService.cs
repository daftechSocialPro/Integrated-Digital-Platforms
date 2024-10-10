using Implementation.Helper;
using IntegratedImplementation.DTOS.Configuration;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.Interfaces.Configuration
{
    public interface IDocumentTypeService
    {
        Task<ResponseMessage> Add(DocumentTypePostDTO driverDocumentTypePost);
        Task<List<DocumentTypeGetDTO>> GetAll();
        Task<List<SelectListDto>> GetDocumentTypeSelectList(DocumentCategory documentCategory);
        Task<ResponseMessage> Update(DocumentTypeGetDTO driverDocumentTypeGet);
    }
}
