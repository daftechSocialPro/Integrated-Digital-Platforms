using Implementation.Helper;
using IntegratedImplementation.DTOS.HRM;
using IntegratedImplementation.Interfaces.HRM;
using IntegratedInfrustructure.Data;
using IntegratedInfrustructure.Model.HRM;
using Microsoft.EntityFrameworkCore;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.Services.HRM
{
    internal class LoanManagementService : ILoanManagementService
    {
        private readonly ApplicationDbContext _dbContext;
        public LoanManagementService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<LoanInfoDto> EmployeesLoanAmmount(Guid employeeId)
        {
            var currentBalance = await _dbContext.EmployeeLoans.Include(x => x.LoanRequest)
                                      .FirstOrDefaultAsync(x => x.LoanRequest.RequesterId == employeeId);
            if (currentBalance == null)
            {
                return new LoanInfoDto();
            }
            return new LoanInfoDto { BorrowedAmount = currentBalance.ApprovedAmmount };
        }

        public async Task<ResponseMessage> RequestLoan(RequestLoanDto requestLoan)
        {
            var loanSetting = await _dbContext.LoanSettings.FirstOrDefaultAsync(x => x.Id == requestLoan.LoanSettingId);
            if (loanSetting == null)
                return new ResponseMessage { Success = false, Message = "Could not find Loan Setting" };

            var currentloan = await _dbContext.EmployeeLoans.Include(x => x.EmployeeSettlements).Where(x => x.LoanRequest.RequesterId == requestLoan.EmployeeId &&
                                                                          x.LoanStatus == LoanStatus.GIVEN).ToListAsync();

            if(loanSetting.MaxLoanAmmount <= currentloan.Sum(x => x.ApprovedAmmount - x.EmployeeSettlements.Sum(y => y.PaidMoney)))
            {
                return new ResponseMessage { Success = false, Message = " You have maxed out the approved loan" };
            }


            LoanRequest rquest = new LoanRequest
            {
                Id = Guid.NewGuid(),
                CreatedById = requestLoan.CreatedById,
                CreatedDate = DateTime.Now,
                DeductionRequest = requestLoan.DeductionRequest,
                LoanSettingId = requestLoan.LoanSettingId,
                RequesterId = requestLoan.EmployeeId,
                TotalMoneyRequest = requestLoan.TotalMoneyRequest,
                Rowstatus = RowStatus.ACTIVE
            };

            await _dbContext.LoanRequests.AddAsync(rquest);
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage { Success = true, Message = "Added Successfully" };

        }
    }
}
