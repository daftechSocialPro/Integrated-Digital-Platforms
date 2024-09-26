using AutoMapper;
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
    public class TaxRateService: ITaxRateService
    {

        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;

        public TaxRateService(ApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

       

        public async Task<ResponseMessage> AddTaxRate(AddTaxRateDto addTaxRate)
        {

            var currentRate = await _dbContext.TaxEntityRates.FirstOrDefaultAsync(x => x.TaxEntityType == addTaxRate.TaxEntityType);

            if(currentRate == null)
            {

                TaxEntityRate entity = new TaxEntityRate
                {
                    Id = Guid.NewGuid(),
                    CreatedDate = DateTime.Now,
                    TaxEntityType = addTaxRate.TaxEntityType,
                    TaxRate = addTaxRate.TaxRate,
                    Witholding = addTaxRate.Witholding,
                    CreatedById = addTaxRate.CreatedById,
                    Rowstatus = RowStatus.ACTIVE
                };

                await _dbContext.TaxEntityRates.AddAsync(entity);
            }
            else
            {
                currentRate.TaxRate = addTaxRate.TaxRate;
                currentRate.Witholding = addTaxRate.Witholding;
            }
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage
            {
                Message = "Added Successfully",
                Success = true
            };
        }

        

        public async Task<List<TaxRateDto>> GetTaxRate()
        {

            var accountTypes = await _dbContext.TaxEntityRates.AsNoTracking()
                                     .Select(x => new TaxRateDto
                                     {
                                         Id = Guid.NewGuid(),
                                         TaxEntityType = x.TaxEntityType.ToString(),
                                         TaxRate = x.TaxRate,
                                         Witholding = x.Witholding,
                                     }).ToListAsync();
                                        
            return accountTypes;
        }


        public async Task<ResponseMessage> AddLedgerPosting(AddLedgerPostingAccountDto addLedger)
        {
            var currentLedger = await _dbContext.LedgerPostingAccounts.FirstOrDefaultAsync(x => x.JournalOption == addLedger.JournalOption);

            if (currentLedger == null)
            {

                LedgerPostingAccount ledgerPosting = new LedgerPostingAccount
                {
                    Id = Guid.NewGuid(),
                    CreatedDate = DateTime.Now,
                    CreatedById = addLedger.CreatedById,
                    ChartOfAccountId = addLedger.ChartOfAccountId,
                    JournalOption = addLedger.JournalOption,
                    Rowstatus = RowStatus.ACTIVE
                };

                await _dbContext.LedgerPostingAccounts.AddAsync(ledgerPosting);
            }
            else
            {
                currentLedger.ChartOfAccountId = addLedger.ChartOfAccountId;
                currentLedger.JournalOption = addLedger.JournalOption;
            }
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage
            {
                Message = "Added Successfully",
                Success = true
            };
        }

        public async Task<List<LedgerPostingAccountDto>> GetLedgerPosting()
        {
            var ledgerType = await _dbContext.LedgerPostingAccounts.Include(x => x.ChartOfAccount).AsNoTracking()
                                      .Select(x => new LedgerPostingAccountDto
                                      {
                                          Id = Guid.NewGuid(),
                                          ChartOfAccount = x.ChartOfAccount.Description,
                                          JournalOption = x.JournalOption.ToString(),
                                      }).ToListAsync();

            return ledgerType;
        }
    }
}
