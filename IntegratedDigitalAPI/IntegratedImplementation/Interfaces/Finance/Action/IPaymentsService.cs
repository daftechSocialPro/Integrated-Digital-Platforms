using Implementation.Helper;
using IntegratedImplementation.DTOS.Finance.Action;
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

        Task<List<PaymentListDto>> GetPendingPayments();

    }
}
