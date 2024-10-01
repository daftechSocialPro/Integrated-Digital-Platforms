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

        public async Task<List<EmployeeLoanDto>> GetMyLoans(Guid employeeId)
        {
            return await _dbContext.EmployeeLoans.Include(x => x.LoanRequest.Requester)
                             .Include(x => x.LoanRequest.LoanSetting)
                              .Include(x => x.ApprovedBy).Include(x => x.SecondApprover)
                              .AsNoTracking()
                              .Where(x => x.LoanRequest.RequesterId == employeeId)
                              .Select(x => new EmployeeLoanDto
                              {
                                  RequestId = x.Id,
                                  EmployeeName = $"{x.LoanRequest.Requester.FirstName} {x.LoanRequest.Requester.MiddleName} {x.LoanRequest.Requester.LastName}",
                                  DeductionPercent = x.LoanRequest.DeductionRequest,
                                  LoanTypeName = x.LoanRequest.LoanSetting.LoanName,
                                  RequestedAmount = x.ApprovedAmmount,
                                  ApproverName = $"{x.ApprovedBy.FirstName} {x.ApprovedBy.MiddleName} {x.ApprovedBy.LastName}",
                                  PaymentStart = x.PaymentStartDate,
                                  PaymentEnd = x.PaymentEndDate,
                                  SecondApproverName = $"{x.SecondApprover.FirstName} {x.SecondApprover.MiddleName} {x.SecondApprover.LastName}",
                                  RequestedDate = x.CreatedDate,
                                  CurrentStatus = x.LoanStatus.ToString()
                              }).ToListAsync();

        }


        public async Task<ResponseMessage> RequestLoan(RequestLoanDto requestLoan)
        {
            var loanSetting = await _dbContext.LoanSettings.FirstOrDefaultAsync(x => x.Id == requestLoan.LoanSettingId);
            if (loanSetting == null)
                return new ResponseMessage { Success = false, Message = "Could not find Loan Setting" };

            if (requestLoan.DeductionRequest < loanSetting.MinDeductedPercent || requestLoan.DeductionRequest > loanSetting.MaxDeductedPercent)
            {
                return new ResponseMessage { Success = false, Message = "Please correct the  Deduction Percent" };
            }

            if (requestLoan.TotalMoneyRequest > loanSetting.MaxLoanAmmount)
            {
                return new ResponseMessage { Success = false, Message = "Please correct the  Ammount of loan" };
            }

            var currentloan = await _dbContext.EmployeeLoans.Include(x => x.EmployeeSettlements).Where(x => x.LoanRequest.RequesterId == requestLoan.EmployeeId &&
                                                                          x.LoanStatus == LoanStatus.GIVEN).ToListAsync();

            if (loanSetting.MaxLoanAmmount <= currentloan.Sum(x => x.ApprovedAmmount - x.EmployeeSettlements.Sum(y => y.PaidMoney)))
            {
                return new ResponseMessage { Success = false, Message = " You have maxed out the approved loan" };
            }

            var currentEmpSalary = await _dbContext.EmploymentDetails.FirstOrDefaultAsync(x => x.EmployeeId == requestLoan.EmployeeId && x.Rowstatus == RowStatus.ACTIVE);
            if (currentEmpSalary == null)
            {
                return new ResponseMessage { Success = false, Message = "Salary has not been set yet!!" };
            }

            if (((currentEmpSalary.Salary / requestLoan.DeductionRequest) * 100) * 12 * loanSetting.PaymentYear <= requestLoan.TotalMoneyRequest)
            {
                return new ResponseMessage { Success = false, Message = $"You can not pay the ammount based on the payment {loanSetting.PaymentYear} year" };
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

        public async Task<List<RequestedLoanListDto>> LoanRequestList()
        {
            return await _dbContext.LoanRequests.Include(x => x.Requester).Include(x => x.LoanSetting).Where(x => !x.EmployeeLoans.Any()).
                              Select(x => new RequestedLoanListDto
                              {
                                  RequestId = x.Id,
                                  EmployeeName = $"{x.Requester.FirstName} {x.Requester.MiddleName} {x.Requester.LastName}",
                                  DeductionPercent = x.DeductionRequest,
                                  LoanTypeName = x.LoanSetting.LoanName,
                                  LoanType = x.LoanSetting.TypeOfLoan.ToString(),
                                  RequestedAmount = x.TotalMoneyRequest,
                                  RequestedDate = x.CreatedDate,

                              }).ToListAsync();
        }

        public async Task<ResponseMessage> ApproveInitialRequest(ApproveInitialRequestDto approveinitial)
        {
            var currentRequest = await _dbContext.LoanRequests.Include(x => x.LoanSetting).FirstOrDefaultAsync(x => x.Id == approveinitial.RequestId);

            if (currentRequest == null)
            {
                return new ResponseMessage { Success = false, Message = "Could not find Request" };
            }

            var currentEmpSalary = await _dbContext.EmploymentDetails.FirstOrDefaultAsync(x => x.EmployeeId == currentRequest.RequesterId && x.Rowstatus == RowStatus.ACTIVE);
            if (currentEmpSalary == null)
            {
                return new ResponseMessage { Success = false, Message = "Set the salary of the employee" };
            }
            var paymentAmmount = (currentEmpSalary.Salary * currentRequest.DeductionRequest) / 100;
            //int currentyear 

            EmployeeLoan loan = new EmployeeLoan()
            {
                Id = Guid.NewGuid(),
                CreatedDate = DateTime.Now,
                CreatedById = approveinitial.createdBId,
                ApprovedAmmount = currentRequest.TotalMoneyRequest,
                LoanRequestId = currentRequest.Id,
                ApprovedById = approveinitial.ApproverId,
                LoanStatus = LoanStatus.PENDING,
                PaymentStartDate = DateTime.Now,
                PayAmmount = paymentAmmount,
                // PaymentEndDate = DateTime.Now.AddYears(currentRequest.LoanSetting.PaymentYear),
                Rowstatus = RowStatus.ACTIVE
            };

            await _dbContext.EmployeeLoans.AddAsync(loan);
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage { Success = true, Message = "Approved Successfully" };
        }


        public async Task<ResponseMessage> ApproveSecondRequest(ApproveInitialRequestDto approveinitial)
        {
            var currentRequest = await _dbContext.EmployeeLoans.FirstOrDefaultAsync(x => x.Id == approveinitial.RequestId);

            if (currentRequest == null)
            {
                return new ResponseMessage { Success = false, Message = "Could not find Request" };
            }

            currentRequest.LoanStatus = LoanStatus.APPROVED;
            currentRequest.SecondApproverId = approveinitial.ApproverId;
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage { Success = true, Message = "Approved Successfully" };
        }

        public async Task<List<EmployeeLoanDto>> GetEmployeeLoans()
        {
            return await _dbContext.EmployeeLoans.Include(x => x.LoanRequest.Requester)
                             .Include(x => x.LoanRequest.LoanSetting)
                              .Include(x => x.ApprovedBy).Include(x => x.SecondApprover)
                              .AsNoTracking()
                              .Select(x => new EmployeeLoanDto
                              {
                                  RequestId = x.Id,
                                  EmployeeName = $"{x.LoanRequest.Requester.FirstName} {x.LoanRequest.Requester.MiddleName} {x.LoanRequest.Requester.LastName}",
                                  DeductionPercent = x.LoanRequest.DeductionRequest,
                                  LoanTypeName = x.LoanRequest.LoanSetting.LoanName,
                                  RequestedAmount = x.ApprovedAmmount,
                                  ApproverName = $"{x.ApprovedBy.FirstName} {x.ApprovedBy.MiddleName} {x.ApprovedBy.LastName}",
                                  PaymentStart = x.PaymentStartDate,
                                  PaymentEnd = x.PaymentEndDate,
                                  SecondApproverName = $"{x.SecondApprover.FirstName} {x.SecondApprover.MiddleName} {x.SecondApprover.LastName}",
                                  RequestedDate = x.CreatedDate,
                                  CurrentStatus = x.LoanStatus.ToString()
                              }).ToListAsync();
        }
    }
}
