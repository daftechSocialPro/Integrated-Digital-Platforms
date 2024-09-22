using Implementation.Helper;
using IntegratedImplementation.DTOS.Finance.Action;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Interfaces.Finance.Action
{
    public interface IPaymentsService
    {
        Task<ResponseMessage> AddPayments(AddPaymentDto addPayment);


        Task<ResponseMessage> ApprovePayment(ApprovePaymentDto approvePayment);
        Task<ResponseMessage> AuthorizePayment(ApprovePaymentDto approvePayment);
        Task<ResponseMessage> AddPayeeDetail(AddPayeeDetailsDto addPayeeDetails);
        Task<List<PayeeDetailListsDto>> GetPayeeDetails(Guid PaymentId);
        Task<ResponseMessage> RemovePayeeDetail(Guid id);

        Task<List<PendingFinanceRequestDto>> GetPendingProjectFinanceRequests();
        Task<List<PaymentListDto>> GetPendingPayments();
        Task<List<PaymentListDto>> GetApprovedPayments();
        Task<List<PaymentListDto>> GetAuthorizedPayments();
        Task<PaymentLetterDto> GetPaymentLetter(Guid paymentId);
    }
}
