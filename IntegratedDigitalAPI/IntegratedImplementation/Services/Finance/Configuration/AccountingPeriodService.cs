using Implementation.Helper;
using IntegratedImplementation.DTOS.Finance.Configuration;
using IntegratedImplementation.Interfaces.Finance.Configuration;
using IntegratedInfrustructure.Data;
using IntegratedInfrustructure.Model.FInance.Configuration;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.Services.Finance.Configuration
{
    public class AccountingPeriodService : IAccountingPeriodService
    {
        private readonly ApplicationDbContext _dbContext;

        public AccountingPeriodService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<ResponseMessage> AddAccountingPeriod(AddAccountingPeriodDto addAccountingPeriod)
        {
            var currentPeriod = await _dbContext.AccountingPeriods.AnyAsync(x => x.StartDate >= addAccountingPeriod.StartDate || x.EndDate <= addAccountingPeriod.StartDate);
            if (currentPeriod)
            {
                return new ResponseMessage { Success = false, Message = "Accounting Period Already exists" };
            }

            ACCOUNTINGPERIODTYPE accountPeriod = Enum.Parse<ACCOUNTINGPERIODTYPE>(addAccountingPeriod.AccountingPeriodType);

            AccountingPeriod period = new AccountingPeriod()
            {
                Id = Guid.NewGuid(),
                AccountingPeriodType = Enum.Parse<ACCOUNTINGPERIODTYPE>(addAccountingPeriod.AccountingPeriodType),
                CalanderType = Enum.Parse<CALANDERTYPE>(addAccountingPeriod.CalanderType),
                CreatedById = addAccountingPeriod.CreatedById,
                CreatedDate = DateTime.Now,
                Description = addAccountingPeriod.Description,
                StartDate = addAccountingPeriod.StartDate,
                Rowstatus = RowStatus.ACTIVE
            };

            if (accountPeriod == ACCOUNTINGPERIODTYPE.TWELVE)
            {
                DateTime LastDate = period.StartDate.AddMonths(11);
                int lastDayofMonth = DateTime.DaysInMonth(LastDate.Year, LastDate.Month);

                period.EndDate = new DateTime(LastDate.Year, LastDate.Month, lastDayofMonth);
            }
            else if (accountPeriod == ACCOUNTINGPERIODTYPE.TWENTYFOUR)
            {
                DateTime LastDate = period.StartDate.AddMonths(23);
                int lastDayofMonth = DateTime.DaysInMonth(LastDate.Year, LastDate.Month);

                period.EndDate = new DateTime(LastDate.Year, LastDate.Month, lastDayofMonth);
            }
            else if (accountPeriod == ACCOUNTINGPERIODTYPE.THIRTYSIX)
            {
                DateTime LastDate = period.StartDate.AddMonths(35);
                int lastDayofMonth = DateTime.DaysInMonth(LastDate.Year, LastDate.Month);

                period.EndDate = new DateTime(LastDate.Year, LastDate.Month, lastDayofMonth);
            }
            else
            {
                DateTime LastDate = period.StartDate.AddMonths(47);
                int lastDayofMonth = DateTime.DaysInMonth(LastDate.Year, LastDate.Month);

                period.EndDate = new DateTime(LastDate.Year, LastDate.Month, lastDayofMonth);
            }

            await _dbContext.AccountingPeriods.AddAsync(period);
            await _dbContext.SaveChangesAsync();

            int totalMonth = (int)(period.EndDate - period.StartDate).TotalDays / 30;

            for (int i = 0; i < totalMonth; i++)
            {
                PeriodDetails details = new PeriodDetails
                {
                    Id = Guid.NewGuid(),
                    AccountingPeriodId = period.Id,
                    CreatedById = addAccountingPeriod.CreatedById,
                    CreatedDate = DateTime.Now,
                    PeriodStart = period.StartDate.AddMonths(i),
                    PeriodNo = i + 1,
                    Rowstatus = RowStatus.ACTIVE,
                };

                DateTime endDate = details.PeriodStart;
                int lastDayDetail = DateTime.DaysInMonth(endDate.Year, endDate.Month);

                period.EndDate = new DateTime(endDate.Year, endDate.Month, lastDayDetail);

                await _dbContext.PeriodDetails.AddAsync(details);
                await _dbContext.SaveChangesAsync();

            }

            return new ResponseMessage { Success = true, Message = "Created Succesfully!!" };
        }

        public async Task<List<AccountingPeriodDto>> GetAccountingPeriod()
        {
            var periods = await _dbContext.AccountingPeriods.AsNoTracking().Select(x => new AccountingPeriodDto
            {
                Id = x.Id,
                AccountingPeriodType = x.AccountingPeriodType.ToString(),
                CalanderType = x.CalanderType.ToString(),
                Description = x.Description,
                EndDate = x.EndDate,
                StartDate = x.StartDate,
                PeriodDetails = x.PeriodDetail.Select(x => new PeriodDetailDto
                {
                    PeriodNo = x.PeriodNo,
                    PeriodStart = x.PeriodStart,
                    PeriodEnd = x.PeriodEnd,
                }).ToList()
            }).ToListAsync();

            return periods;
        }
    }
}
