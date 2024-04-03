using Implementation.Helper;
using IntegratedImplementation.DTOS.Finance.Action;
using IntegratedImplementation.DTOS.HRM;
using IntegratedImplementation.Interfaces.Finance.Action;
using IntegratedInfrustructure.Data;
using IntegratedInfrustructure.Model.HRM;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.Services.Finance.Action
{
    public class LoanIssuanceService: ILoanIssuanceService
    {
        private readonly ApplicationDbContext _dbContext;

        public LoanIssuanceService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<ApprovedLoansDto>> GetApprovedLoans()
        {
            return await _dbContext.EmployeeLoans.Include(x => x.LoanRequest.Requester).ThenInclude(x => x.EmployeeDetail)
                             .Include(x => x.LoanRequest.LoanSetting)
                              .Include(x => x.EmployeeSettlements)
                              .Include(x => x.ApprovedBy).Include(x => x.SecondApprover)
                              .Where(x => x.LoanStatus == LoanStatus.APPROVED || x.LoanStatus == LoanStatus.GIVEN)
                              .AsNoTracking()
                              .Select(x => new ApprovedLoansDto
                              {
                                  Id = x.Id,
                                  EmployeeCode = x.LoanRequest.Requester.EmployeeCode,
                                  EmployeeName = $"{x.LoanRequest.Requester.FirstName} {x.LoanRequest.Requester.MiddleName} {x.LoanRequest.Requester.LastName}",
                                  GivenAmmount = x.ApprovedAmmount,
                                  MonthlyPayment = x.PayAmmount,
                                  TotalPayment = x.EmployeeSettlements.Sum(x => x.PaidMoney),
                                  InitialApprover = $"{x.ApprovedBy.FirstName} {x.ApprovedBy.MiddleName} {x.ApprovedBy.LastName}",
                                  SecondApprover = $"{x.SecondApprover.FirstName} {x.SecondApprover.MiddleName} {x.SecondApprover.LastName}",
                                  CurrentSalary = x.LoanRequest.Requester.EmployeeDetail.Any(y => y.Rowstatus == RowStatus.ACTIVE) ? x.LoanRequest.Requester.EmployeeDetail.First(y => y.Rowstatus == RowStatus.ACTIVE).Salary : 0,
                                  ReturnPeriod = Convert.ToInt32(x.ApprovedAmmount / x.PayAmmount),
                                  LoanStatus = x.LoanStatus.ToString(),
                              }).ToListAsync();
        }

        public async Task<ResponseMessage> GiveLoan(Guid employeeLoanId)
        {
            var currentLoan = await _dbContext.EmployeeLoans.FirstOrDefaultAsync(x => x.Id == employeeLoanId);

            if(currentLoan == null)
            {
                return new ResponseMessage { Success = false, Message = "Loan Could not be found" };
            }

            currentLoan.LoanStatus = LoanStatus.GIVEN;

            await _dbContext.SaveChangesAsync();

            return new ResponseMessage { Success = true, Message = "Updated Successfully" };
        }

        public async Task<ResponseMessage> PayLoan(LoanPaymentDto loanPayment)
        {
            var currentLoan = await _dbContext.EmployeeLoans.Include(x => x.EmployeeSettlements).FirstOrDefaultAsync(x => x.Id == loanPayment.EmployeeLoanId);

            if(currentLoan == null)
            {
                return new ResponseMessage { Success = false, Message = "Could Not Find Employee Loan" };
            }

            double totalPaid = currentLoan.EmployeeSettlements.Sum(x => x.PaidMoney);

            if (totalPaid + loanPayment.TotalPayment > currentLoan.ApprovedAmmount)
            {
                double totalNedded = currentLoan.ApprovedAmmount - totalPaid;
                return new ResponseMessage { Success = false, Message = $"The total needed ammount is {totalNedded}!!" };
            }

            EmployeeSettlement settlment = new EmployeeSettlement()
            {
                Id  = Guid.NewGuid(),
                CreatedById = loanPayment.CreatedById,
                CreatedDate = DateTime.Now,
                EmployeeLoanId = currentLoan.Id,
                PaidDate = DateTime.Now,
                PaidMoney = loanPayment.TotalPayment,
                Rowstatus = RowStatus.ACTIVE,
            };
            

            if(totalPaid + loanPayment.TotalPayment == currentLoan.ApprovedAmmount)
            {
                currentLoan.LoanStatus = LoanStatus.PAID;
            }

            return new ResponseMessage { Success = true, Message = "Paid Loan Succesfully!!" };

        }
    }
}
