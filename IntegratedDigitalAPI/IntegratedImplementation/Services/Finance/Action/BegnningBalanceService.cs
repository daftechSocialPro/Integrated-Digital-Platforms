using Implementation.Helper;
using IntegratedImplementation.DTOS.Finance.Action;
using IntegratedImplementation.Interfaces.Finance.Action;
using IntegratedInfrustructure.Data;
using IntegratedInfrustructure.Model.FInance.Actions;
using Irony;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.Services.Finance.Action
{
    public class BegnningBalanceService : IBegnningBalanceService
    {
        private readonly ApplicationDbContext _dbContext;
        public BegnningBalanceService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

       
        public async Task<ResponseMessage> GetChartsForBegnning(Guid PeriodId)
        {
            var alreadyExixts = await _dbContext.BegningBalances.Where(x => x.AccountingPeriodId == PeriodId).AnyAsync();

            if (alreadyExixts)
            {

                return new ResponseMessage { Success = false, Message = "The balance for this accounting period has been set" };
            }

            var chartsList = await _dbContext.ChartOfAccounts.Include(x => x.AccountType).Select(x => new ChartOfAccountBegningDto
            {
                Id = x.Id,
                Ammount = 0,
                Description = $"{x.AccountNo}-{x.Description}",
                Type = x.AccountType.Normal_Balance.ToString(),
            }).ToListAsync();

            return new ResponseMessage { Success = true , Message = "" , Data = chartsList };
        }

        public async Task<ResponseMessage> AddBegnningBalance(AddBegnningBalanceDto addBegnningBalance)
        {

            if(addBegnningBalance.TotalCredit != addBegnningBalance.TotalDebit)
            {
                return new ResponseMessage { Success = false, Message = "Credit and/or Debit are not correct" };
            }
            BegningBalance begningBalance = new BegningBalance()
            {
                Id = Guid.NewGuid(),
                AccountingPeriodId = addBegnningBalance.AccountingPeriodId,
                CreatedById = addBegnningBalance.CreatedById,
                CreatedDate = DateTime.Now,
                Remark = addBegnningBalance.Remark,
                TotalCredit = addBegnningBalance.TotalCredit,
                TotalDebit = addBegnningBalance.TotalDebit,
                Rowstatus = RowStatus.ACTIVE
            };

            await _dbContext.BegningBalances.AddAsync(begningBalance);
            await _dbContext.SaveChangesAsync();

            foreach(var items in addBegnningBalance.BegningBalanceDetails)
            {
                BegningBalanceDetail detail = new BegningBalanceDetail()
                {
                    Id = Guid.NewGuid(),
                    Ammount = items.Ammount,
                    BegningBalanceId = begningBalance.Id,
                    ChartOfAccountId = items.ChartOfAccountId,
                    CreatedById = addBegnningBalance.CreatedById,
                    CreatedDate = DateTime.Now,
                    Rowstatus = RowStatus.ACTIVE,
                    Remark = items.Remark,
                };

                await _dbContext.BegningBalanceDetails.AddAsync(detail);
                await _dbContext.SaveChangesAsync();
            }

            return new ResponseMessage { Success = true, Message = "Added Successfully" };
        }



    }
}
