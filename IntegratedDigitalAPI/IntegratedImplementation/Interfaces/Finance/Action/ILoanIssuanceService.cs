using Implementation.Helper;
using IntegratedImplementation.DTOS.Finance.Action;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Interfaces.Finance.Action
{
    public interface ILoanIssuanceService
    {
        public Task<List<ApprovedLoansDto>> GetApprovedLoans();

        public Task<ResponseMessage> GiveLoan(Guid employeeLoanId);

        public Task<ResponseMessage> PayLoan(LoanPaymentDto loanPayment);
    }
}
