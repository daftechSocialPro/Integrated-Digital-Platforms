using Implementation.Helper;
using IntegratedImplementation.DTOS.HRM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Interfaces.HRM
{
    public interface ILoanManagementService
    {
        Task<LoanInfoDto> EmployeesLoanAmmount(Guid employeeId);

        Task<ResponseMessage> RequestLoan(RequestLoanDto requestLoan);

        public Task<List<RequestedLoanListDto>> LoanRequestList();

        public Task<ResponseMessage> ApproveInitialRequest(ApproveInitialRequestDto approveinitial);

        public Task<List<EmployeeLoanDto>> GetEmployeeLoans();

    }
}
