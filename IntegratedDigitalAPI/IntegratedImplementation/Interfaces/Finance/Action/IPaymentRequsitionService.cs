using Implementation.Helper;
using IntegratedImplementation.DTOS.Finance.Action;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Interfaces.Finance.Action
{
    public interface IPaymentRequsitionService
    {
    
        public Task<ResponseMessage> AddPaymentRequisition(PaymentRequisitionPostDto paymentRequisitionPostDto);
        public Task<List<PaymentRequisitionGetDto>> GetPendingPaymentRequisitions();
        public Task<ResponseMessage> ApprovePaymentRequisition(ApprovePaymentRequsition paymentRequsition);
        public Task<List<PaymentRequisitionGetDto>> GetAuthorizedPaymentRequisitions();
        public Task<List<ActivityForSettlementDto>> GetEmployeePaymentSettlements();
        public Task<List<EmployeeRequsitionsDto>> GetEmployeeRequsitions(string userId);
        public Task<List<PendingRequestAmmountDto>> GetPendignRequestsByProjectManager(Guid employeeId);
        public Task<BudgetByActivityDto> GetBudgetByActivity(Guid activityId);
    }
}
