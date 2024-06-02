using DocumentFormat.OpenXml.Vml.Spreadsheet;
using Implementation.Helper;
using IntegratedImplementation.DTOS.Finance.Action;
using IntegratedImplementation.Interfaces.Finance.Action;
using IntegratedInfrustructure.Data;
using IntegratedInfrustructure.Model.FInance.Actions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.Services.Finance.Action
{
    public class AccountReconsilationService : IAccountReconsilationService
    {

        private readonly ApplicationDbContext _dbContext;

        public  AccountReconsilationService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

       
        public async Task<AccountToBeReconsiledDto> GetAccountToBeReconsiled(AccountReconsilationFindDto reconsilationFindDto)
        {
            AccountToBeReconsiledDto account = new AccountToBeReconsiledDto();

            account.CheckAndBalance = await _dbContext.Payments.Where(x => x.AccountingPeriodId == reconsilationFindDto.AccountingPeriodId && x.BankId == reconsilationFindDto.BankId)
                                .AsNoTracking().Include(x => x.PaymentDetails).Select(x => new CheckAndBalanceDto
                                {
                                    Id = x.Id,
                                    Ammount = x.PaymentDetails.Sum(x => x.TotalPrice),
                                    Check  = x.PaymentNumber,
                                    Date = x.PaymentDate,
                                    Payee = x.Remark,
                                }).ToListAsync();

            account.DepositBank = await _dbContext.Receipts.Where(x => x.AccountingPeriodId == reconsilationFindDto.AccountingPeriodId && x.BankId == reconsilationFindDto.BankId).
                                AsNoTracking().Include(x => x.ReceiptDetails).Select(x => new DepositBankDto
                                {
                                    Id = x.Id,
                                    Ammount = x.ReceiptDetails.Sum(x => x.UnitPrice * x.Quantity),
                                    Date = x.Date,
                                    Description = "",
                                    ReferenceNo = x.ReferenceNumber,
                                }).ToListAsync();

            return account;

        }

        public async Task<ResponseMessage> AddAccountReconsilation(AddAccountReconsilationDto addAccountReconsilation)
        {
            var exists = await _dbContext.AccountReconciliations.AnyAsync(x => x.BankListId == addAccountReconsilation.BankId && x.PeriodId == addAccountReconsilation.PeriodId);

            if(exists)
            {
                return new ResponseMessage { Success = false, Message = "Data Already Exists" };
            }

            AccountReconciliation account = new AccountReconciliation()
            {
                Id = Guid.NewGuid(),
                Balance = addAccountReconsilation.Ammount,
                BankListId = addAccountReconsilation.BankId,
                CreatedById = addAccountReconsilation.CreatedById,
                CreatedDate = DateTime.Now,
                PeriodId = addAccountReconsilation.PeriodId,
                Remark = "",
                Rowstatus = RowStatus.ACTIVE,
            };

            await _dbContext.AccountReconciliations.AddAsync(account);
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage { Success = true, Message = "Added Succesfully" };
        }

    }
}
