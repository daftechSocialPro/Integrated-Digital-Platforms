using Implementation.Helper;
using IntegratedImplementation.DTOS.Finance.Action;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.Interfaces.Finance.Action
{
    public interface IJournalVochureService
    {
        Task<ResponseMessage> AddJournalVochure(AddJournalVochureDto addJournalVochureDto);
        Task<List<GetJournalVoucherDto>> GetJournalVochures(TypeofJV typeofJV);


    }
}
