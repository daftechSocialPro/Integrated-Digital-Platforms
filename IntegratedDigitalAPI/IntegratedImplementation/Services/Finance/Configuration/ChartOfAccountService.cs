using AutoMapper;
using Implementation.Helper;
using IntegratedImplementation.DTOS.Finance.Configuration;
using IntegratedImplementation.Interfaces.Finance.Configuration;
using IntegratedInfrustructure.Data;
using IntegratedInfrustructure.Model.FInance.Configuration;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Security.Cryptography.X509Certificates;
using System.Security.Cryptography.Xml;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.Services.Finance.Configuration
{
    public class ChartOfAccountService : IChartOfAccountService
    {
        private readonly ApplicationDbContext _dbContext;


        public ChartOfAccountService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<ResponseMessage> AddChartOfAccount(AddChartOfAccountDto chartOfAccount)
        {
            ChartOfAccount account = new ChartOfAccount()
            {
                Id = Guid.NewGuid(),
                AccountNo = chartOfAccount.AccountNo,
                AccountTypeId = chartOfAccount.AccountTypeId,
                CreatedById = chartOfAccount.CreatedById,
                CreatedDate = DateTime.Now,
                Description = chartOfAccount.Description,
                OnlyControlAccount = chartOfAccount.OnlyControlAccount,
                Rowstatus = RowStatus.ACTIVE
            };

            await _dbContext.ChartOfAccounts.AddAsync(account);
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage { Success = true, Message = "Created Succesfully!!" };
        }

        public async Task<ResponseMessage> AddSubsidiaryAccount(AddSubsidiaryAccount addSubsidiaryAccount)
        {

            var currentSequence = await _dbContext.SubsidiaryAccounts.AnyAsync(x => x.ChartOfAccountId == addSubsidiaryAccount.ChartOfAccountId && x.Sequence == addSubsidiaryAccount.Sequence);
            if (currentSequence)
                return new ResponseMessage { Success = false, Message = "Sequence already exists!" };

            SubsidiaryAccount account = new SubsidiaryAccount()
            {
                Id = Guid.NewGuid(),
                AccountNo = addSubsidiaryAccount.AccountNo,
                ChartOfAccountId = addSubsidiaryAccount.ChartOfAccountId,
                CreatedById = addSubsidiaryAccount.CreatedById,
                CreatedDate = DateTime.Now,
                Description = addSubsidiaryAccount.Description,
                Rowstatus= RowStatus.ACTIVE,
                Sequence = addSubsidiaryAccount.Sequence
                
            };

            await _dbContext.SubsidiaryAccounts.AddAsync(account);
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage { Success = true, Message = "Added Succesfully!!" };
        }

        public async Task<ResponseMessage> ChangeChartOfAccountStatus(Guid accountId)
        {
            var chartofAccount = await _dbContext.ChartOfAccounts.FirstOrDefaultAsync(x => x.Id == accountId);

            if (chartofAccount == null)
            { return new ResponseMessage { Success = false, Message = "Can not find chart of account" }; }

            if (chartofAccount.Rowstatus == RowStatus.ACTIVE)
            {
                chartofAccount.Rowstatus = RowStatus.INACTIVE;
            }
            else
            {
                chartofAccount.Rowstatus = RowStatus.ACTIVE;
            }

            await _dbContext.SaveChangesAsync();
            return new ResponseMessage { Success = true, Message = "Success" };
        }

        public async Task<ResponseMessage> ChangeSubsidiaryAccountStatus(Guid subsidiaryId)
        {
            var chartofAccount = await _dbContext.SubsidiaryAccounts.FirstOrDefaultAsync(x => x.Id == subsidiaryId);

            if (chartofAccount == null)
            { return new ResponseMessage { Success = false, Message = "Can not find chart of account" }; }

            if (chartofAccount.Rowstatus == RowStatus.ACTIVE)
            {
                chartofAccount.Rowstatus = RowStatus.INACTIVE;
            }
            else
            {
                chartofAccount.Rowstatus = RowStatus.ACTIVE;
            }

            await _dbContext.SaveChangesAsync();
            return new ResponseMessage { Success = true, Message = "Success" };
        }

        public async Task<List<ChartOfAccountDto>> GetChartOfAccounts()
        {
            var charts = await _dbContext.ChartOfAccounts.AsNoTracking().Include(x => x.SubsidaryAccounts).Include(x => x.AccountType).Select(x => new ChartOfAccountDto
            {
                Id = x.Id,
                AccountNo = x.AccountNo,
                AccountType = x.AccountType.Type,
                Description = x.Description,
                IsActive = x.Rowstatus == RowStatus.ACTIVE ? true : false,
                OnlyControlAccount = x.OnlyControlAccount,
                SubsidiaryAccounts = x.SubsidaryAccounts.Select(x => new SubsidiaryAccountDto
                {
                    AccountNo = x.AccountNo,
                    Id = x.Id,
                    Description = x.Description,
                    IsActive = x.Rowstatus == RowStatus.ACTIVE ? true : false,
                    Sequence = x.Sequence
                }).OrderBy(x => x.Sequence).ToList()
            }).ToListAsync();

            return charts;
        }

        public async Task<ResponseMessage> UpdateChartOfAccount(UpdateChartOfAccountDto chartOfAccount)
        {
            var currentChart = await _dbContext.ChartOfAccounts.FindAsync(chartOfAccount.Id);

            if(currentChart == null)
            {
                return new ResponseMessage { Success = false, Message = "Could not find account" };
            }

            currentChart.AccountNo = chartOfAccount.AccountNo;
            currentChart.OnlyControlAccount = chartOfAccount.OnlyControlAccount;
            currentChart.Description = chartOfAccount.Description;
            currentChart.AccountTypeId = chartOfAccount.AccountTypeId;

            await _dbContext.SaveChangesAsync();

            return new ResponseMessage { Success = true, Message = "Updated Succesfully" };

        }

        public async Task<ResponseMessage> UpdateSubsidiaryAccount(UpdateSubsidiaryAccount updateSubsidiaryAccount)
        {
            var currentAccount = await _dbContext.SubsidiaryAccounts.FindAsync(updateSubsidiaryAccount.Id);

            if (currentAccount == null)
            {
                return new ResponseMessage { Success = false, Message = "Could not find account" };
            }

            var sequenceExists = await _dbContext.SubsidiaryAccounts.AnyAsync(x => x.Sequence == updateSubsidiaryAccount.Sequence && x.ChartOfAccountId ==  updateSubsidiaryAccount.ChartOfAccountId);  
            if(sequenceExists)
            {
                return new ResponseMessage { Success = false, Message = "Sequence already exists" };
            }

            currentAccount.AccountNo = updateSubsidiaryAccount.AccountNo;
            currentAccount.Description = updateSubsidiaryAccount.Description;
            currentAccount.Sequence = updateSubsidiaryAccount.Sequence;

            await _dbContext.SaveChangesAsync();

            return new ResponseMessage { Success = true, Message = "Updated Succesfully" };
        }
    }
}
