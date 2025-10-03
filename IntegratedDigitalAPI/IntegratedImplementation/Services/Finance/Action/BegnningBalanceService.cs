using DocumentFormat.OpenXml.Drawing;
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
                var id = await _dbContext.BegningBalanceDetails
                                            .Where(x => x.BegningBalance.AccountingPeriodId == PeriodId)
                                            .GroupBy(a => a.ChartOfAccountId)
                                            .Select(g => g.First().Id)
                                            .ToListAsync();
                var currentBalance = await _dbContext.BegningBalanceDetails.Include(x => x.BegningBalance).Where(x => id.Contains(x.Id))
                                        .AsNoTracking().Include(x => x.ChartOfAccount.AccountType)
                                        .Select(x => new ChartOfAccountBegningDto
                                        {
                                            Id = x.ChartOfAccountId,
                                            Ammount = x.SubsidiaryAccountId == null ? x.Ammount : 0,
                                            Description = $"{x.ChartOfAccount.AccountNo}-{x.ChartOfAccount.Description}",
                                            Type = x.ChartOfAccount.AccountType.Normal_Balance.ToString(),
                                            Remark = x.Remark,
                                        }).ToListAsync();

                foreach (var item in currentBalance)
                {
                    item.SubsidaryAccountBegningDtos = new List<SubsidaryAccountBegningDto>();
                    item.SubsidaryAccountBegningDtos = await _dbContext.BegningBalanceDetails.Include(x => x.SubsidiaryAccount)
                                            .Where(x => x.ChartOfAccountId == item.Id && x.SubsidiaryAccount != null).Select(x => new SubsidaryAccountBegningDto
                                            {
                                                Id = Guid.Parse(x.SubsidiaryAccountId.ToString()),
                                                Ammount = x.Ammount,
                                                Description = $"{x.SubsidiaryAccount.AccountNo}-{x.SubsidiaryAccount.Description}",
                                                Remark = x.Remark
                                            }).ToListAsync();

                }

                return new ResponseMessage { Success = false, Message = "The balance for this accounting period has been set", Data = currentBalance };
            }

            var chartsList = await _dbContext.ChartOfAccounts.Include(x => x.AccountType).Include(x => x.SubsidaryAccounts).Select(x => new ChartOfAccountBegningDto
            {
                Id = x.Id,
                Ammount = 0,
                Description = $"{x.AccountNo}-{x.Description}",
                Type = x.AccountType.Normal_Balance.ToString(),
                SubsidaryAccountBegningDtos = x.SubsidaryAccounts.Select(y => new SubsidaryAccountBegningDto
                {
                    Id = y.Id,
                    Description = $"{y.AccountNo}-{y.Description}",
                    Ammount = 0,
                }).ToList()
            }).ToListAsync();

            return new ResponseMessage { Success = true , Message = "" , Data = chartsList };
        }

        public async Task<ResponseMessage> AddBegnningBalance(AddBegnningBalanceDto addBegnningBalance)
        {

            if (addBegnningBalance.TotalCredit != addBegnningBalance.TotalDebit)
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

            foreach (var items in addBegnningBalance.BegningBalanceDetails)
            {
                BegningBalanceDetail detail = new BegningBalanceDetail()
                {
                    Id = Guid.NewGuid(),
                    Ammount = items.Ammount,
                    BegningBalanceId = begningBalance.Id,
                    ChartOfAccountId = items.ChartOfAccountId,
                    SubsidiaryAccountId = items.SubsidaryAccountId != null ?items.SubsidaryAccountId: null,
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
