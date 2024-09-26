using Implementation.Helper;
using IntegratedImplementation.DTOS.Finance.Action;
using IntegratedImplementation.Interfaces.Finance.Action;
using IntegratedInfrustructure.Data;
using IntegratedInfrustructure.Model.FInance.Actions;
using Microsoft.EntityFrameworkCore;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.Services.Finance.Action
{
    public class JournalVoucherService : IJournalVochureService
    {
        private ApplicationDbContext _dbContext;

        public JournalVoucherService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }


        public async Task<ResponseMessage> AddJournalVochure(AddJournalVochureDto addJournalVochureDto)
        {
            var currentPeriod = await _dbContext.PeriodDetails.Include(x => x.AccountingPeriod).FirstOrDefaultAsync(x => x.AccountingPeriod.Rowstatus == RowStatus.ACTIVE && x.PeriodStart.Date <= addJournalVochureDto.Date.Date && x.PeriodEnd.Date.Date >= addJournalVochureDto.Date.Date);

            if (currentPeriod == null)
            {
                return new ResponseMessage { Success = false, Message = "Please Add Accounting Period" };
            }
            else if (!(currentPeriod.AccountingPeriod.StartDate <= addJournalVochureDto.Date && currentPeriod.AccountingPeriod.EndDate >= addJournalVochureDto.Date))
            {
                return new ResponseMessage { Success = false, Message = "The accounting Period is not consistent with the payment date " };
            }

            if (addJournalVochureDto.Date >= DateTime.Now)
            {
                return new ResponseMessage { Success = false, Message = "Please correcft the Payment Date" };
            }

            if (addJournalVochureDto.AddJournalVoucherDetailDtos.Sum(x => x.Credit) != addJournalVochureDto.AddJournalVoucherDetailDtos.Sum(x => x.Debit))
            {
                return new ResponseMessage { Success = false, Message = "Credit and Debit are not Equal please check your fields again" };
            }

            JournalVoucher jv = new JournalVoucher()
            {
                Id = Guid.NewGuid(),
                CreatedDate = DateTime.Now,
                CreatedById = addJournalVochureDto.CreatedById,
                Date = addJournalVochureDto.Date,
                PeriodDetailsId = currentPeriod.Id,
                Description = addJournalVochureDto.Description,
                TypeofJV = addJournalVochureDto.TypeofJV,
                Rowstatus = RowStatus.ACTIVE
            };

            await _dbContext.JournalVouchers.AddAsync(jv);
            await _dbContext.SaveChangesAsync();


            foreach (var item in addJournalVochureDto.AddJournalVoucherDetailDtos)
            {
                JournalVoucherDetail detail = new JournalVoucherDetail()
                {
                    Id = Guid.NewGuid(),
                    ChartOfAccountId = item.ChartOfAccountId,
                    CreatedById = addJournalVochureDto.CreatedById,
                    CreatedDate = DateTime.Now,
                    Credit = item.Credit,
                    Debit = item.Debit,
                    JournalVoucherId = jv.Id,
                    Remark = item.Remark,
                    Rowstatus = RowStatus.ACTIVE,

                };
                if (item.SubsidiaryAccountId != null)
                {
                    detail.SubsidiaryAccountId = item.SubsidiaryAccountId;
                }

                await _dbContext.JournalVoucherDetails.AddAsync(detail);
                await _dbContext.SaveChangesAsync();
            }

            return new ResponseMessage { Success = true, Message = "Journal Voucher Added Succesfully!!" };
        }

       

        public async Task<List<GetJournalVoucherDto>> GetJournalVochures(TypeofJV typeofJV)
        {
            var journalVochures = await _dbContext.JournalVouchers.Where(x => x.TypeofJV == typeofJV).Select(x => new GetJournalVoucherDto()
            {
                Id = x.Id,
                Date = x.Date,
                Description = x.Description,
                TypeofJVName = x.TypeofJV.ToString(),
                GetJournalVoucherDetails = _dbContext.JournalVoucherDetails.Where(jd => jd.JournalVoucherId == x.Id).Select(jd => new GetJournalVoucherDetailDto()
                {
                    ChartOfAccountDescription = $"{jd.ChartOfAccount.Description} ( {jd.ChartOfAccount.AccountNo} )",
                    SubsidiaryAccountDescription = $"{jd.SubsidiaryAccount.Description} ( {jd.SubsidiaryAccount.AccountNo} )",
                    Debit = jd.Debit,
                    Credit = jd.Credit,
                    Remark = jd.Remark
                }).ToList()
            }).ToListAsync();

            return journalVochures;
        }

        public async Task<AddJournalVoucherDetailDto> GetJournalByTaxPayerType(TaxEntityType typeofJV)
        {
            var currentChartAccount = await _dbContext.LedgerPostingAccounts.Where(x => x.JournalOption == JournalOption.WitholdingAccount)
                                    .Include(x => x.ChartOfAccount)
                                    .FirstAsync();


            if (currentChartAccount == null)
            {
                return new AddJournalVoucherDetailDto();
            }

            var selectedentity = await _dbContext.TaxEntityRates.Where(x => x.TaxEntityType == typeofJV).FirstOrDefaultAsync();
            return new AddJournalVoucherDetailDto();
        }
    }
}
