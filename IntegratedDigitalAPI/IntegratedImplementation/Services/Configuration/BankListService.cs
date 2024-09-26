using Implementation.Helper;
using IntegratedImplementation.DTOS.Configuration;
using IntegratedImplementation.Interfaces.Configuration;
using IntegratedInfrustructure.Data;
using IntegratedInfrustructure.Model.Configuration;
using Microsoft.EntityFrameworkCore;
using NLog.Time;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.Services.Configuration
{
    public class BankListService : IBankListService
    {
        private readonly ApplicationDbContext _dbContext; 

        public BankListService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<ResponseMessage> AddBank(AddBankDto addBank)
        {
            var bankExists = await _dbContext.BankLists.AnyAsync(x => x.BankName == addBank.BankName);
            if (bankExists)
                return new ResponseMessage { Success = false, Message = "Bank Name already Exists" };

            BankList bank = new BankList
            {
                Id = Guid.NewGuid(),
                CreatedById = addBank.createdById,
                CreatedDate = DateTime.Now,
                Rowstatus = RowStatus.ACTIVE,
                AccountNumber = addBank.AccountNumber,
                Address = addBank.Address,
                AmharicAddress = addBank.AmharicAddress,
                Branch = addBank.Branch,
                AmharicBranch = addBank.AmharicBranch,
                AmharicName = addBank.AmharicName,
                BankDigitNumber = addBank.BankDigitNumber,
                BankName = addBank.BankName
            };

            await _dbContext.BankLists.AddAsync(bank);
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage { Success = true, Message = "Added Bank Succesfulluly" };
        }

        public async Task<List<BankListDto>> GetBankList()
        {
            return await _dbContext.BankLists.AsNoTracking()
                        .Select(x => new BankListDto
                        {
                            Id = x.Id,
                            AccountNumber = x.AccountNumber,
                            Address = x.Address,
                            AmharicAddress = x.AmharicAddress,
                            AmharicName = x.AmharicName,
                            Branch = x.Branch,
                            AmharicBranch = x.AmharicBranch,
                            BankDigitNumber = x.BankDigitNumber,
                            BankName = x.BankName
                        }).ToListAsync();
        }

        public async Task<ResponseMessage> UpdateBank(UpdateBankDto updateBank)
        {
            var currentBank = await _dbContext.BankLists.FirstOrDefaultAsync(x => x.Id == updateBank.Id);
            if (currentBank == null)
                return new ResponseMessage { Success = false, Message = "Could not find Bank" };

            var bankExists = await _dbContext.BankLists.AnyAsync(x => x.BankName == updateBank.BankName && x.Id != currentBank.Id);
            if (bankExists)
                return new ResponseMessage { Success = false, Message = "Bank Name already Exists" };

            currentBank.BankName = updateBank.BankName;
            currentBank.AmharicName = updateBank.AmharicName;
            currentBank.AccountNumber = updateBank.AccountNumber;
            currentBank.BankDigitNumber = updateBank.BankDigitNumber;
            currentBank.Address = updateBank.Address;
            currentBank.AmharicAddress = updateBank.AmharicAddress;
            currentBank.Branch = updateBank.Branch;
            currentBank.AmharicBranch = updateBank.AmharicBranch;

            await _dbContext.SaveChangesAsync();

            return new ResponseMessage { Success = true, Message = "Updated SuccessFully" };
        }
    }
}
