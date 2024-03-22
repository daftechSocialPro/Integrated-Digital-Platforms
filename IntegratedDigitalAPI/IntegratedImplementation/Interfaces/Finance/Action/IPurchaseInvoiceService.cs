using Implementation.Helper;
using IntegratedImplementation.DTOS.Finance.Action;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Interfaces.Finance.Action
{
    public interface IPurchaseInvoiceService
    {
        Task<List<PurchaseInvoiceDto>> GetPurchaseInvoices();

        Task<ResponseMessage> AddPurchaseInvoice(AddPurchaseInvoiceDto addPurchaseInvoice);

        Task<ResponseMessage> ApprovePurchaseInvoice(Guid PurchaseInvoiceId, Guid EmployeeId);

        Task<List<PurchaseInvoiceDto>> GetPendingPurchaseInvoices();
    }
}
