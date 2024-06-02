using Implementation.Helper;
using IntegratedImplementation.DTOS.PM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Interfaces.PM
{
    public interface IProjectPaymentService
    {

        public Task<ResponseMessage> AddPaymentRequisition(PaymentRequisitionPostDto paymentRequisitionPostDto);
        public Task<List<PaymentRequisitionGetDto>> GetPendingPaymentRequisitions();
        public Task<List<PaymentRequisitionGetDto>> GetAuthorizedPaymentRequisitions();
    }
}
