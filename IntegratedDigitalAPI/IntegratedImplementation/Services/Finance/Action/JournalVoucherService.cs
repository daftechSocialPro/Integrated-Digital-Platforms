using Implementation.Helper;
using IntegratedImplementation.DTOS.Finance.Action;
using IntegratedImplementation.Interfaces.Finance.Action;
using IntegratedInfrustructure.Data;
using IntegratedInfrustructure.Migrations;
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

            if(addJournalVochureDto.AddJournalVoucherDetailDtos.Sum(x => x.Credit) != addJournalVochureDto.AddJournalVoucherDetailDtos.Sum(x => x.Debit))
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


            foreach(var item in addJournalVochureDto.AddJournalVoucherDetailDtos)
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
                if(item.SubsidiaryAccountId != null)
                {
                    detail.SubsidiaryAccountId = item.SubsidiaryAccountId;
                }

                await _dbContext.JournalVoucherDetails.AddAsync(detail);
                await _dbContext.SaveChangesAsync();
            }

            return new ResponseMessage { Success = true, Message = "Journal Voucher Added Succesfully!!" };
        }
    }
}
