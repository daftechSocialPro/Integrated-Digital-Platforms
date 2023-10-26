using Implementation.Helper;
using IntegratedImplementation.DTOS.HRM;
using IntegratedImplementation.Interfaces.HRM;
using IntegratedInfrustructure.Data;
using IntegratedInfrustructure.Model.HRM;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;


namespace IntegratedImplementation.Services.HRM
{
    public class LoanSettingService : ILoanSettingService
    {

        private readonly ApplicationDbContext _dbContext;

        public LoanSettingService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<ResponseMessage> AddLoanSetting(AddLoanSettingDto addLoanSetting)
        {
            LoanSetting loanSetting = new LoanSetting()
            {
                Id = Guid.NewGuid(),
                CreatedDate = DateTime.Now,
                CreatedById = addLoanSetting.CreatedById,
                LoanName = addLoanSetting.LoanName,
                MaxDeductedPercent = addLoanSetting.MaxDeductedPercent,
                MaxLoanAmmount = addLoanSetting.MaxLoanAmmount,
                MinDeductedPercent = addLoanSetting.MinDeductedPercent,
                PaymentYear = addLoanSetting.PaymentYear,
                TypeOfLoan = addLoanSetting.TypeOfLoan,
                Remark = addLoanSetting.Remark,
                Rowstatus = RowStatus.ACTIVE
            };

            await _dbContext.LoanSettings.AddAsync(loanSetting);
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage { Data = loanSetting , Success = true , Message = "Added Loan setting Successfully!!" };
        }

        public async Task<List<LoanSettingDto>> GetLoanSettings()
        {
            return await _dbContext.LoanSettings.Select(x => new LoanSettingDto
            {
                Id = x.Id,
                LoanName = x.LoanName,
                MaxDeductedPercent= x.MaxDeductedPercent,
                MaxLoanAmmount= x.MaxLoanAmmount,
                MinDeductedPercent = x.MinDeductedPercent,
                PaymentYear = x.PaymentYear,
                Remark = x.Remark,
                TypeOfLoan = x.TypeOfLoan.ToString()
            }).ToListAsync();
        }

        public async Task<ResponseMessage> UpdateLoanSetting(UpdateLoanSettingDto updateLoanSetting)
        {
            var currentSetting = await _dbContext.LoanSettings.FirstOrDefaultAsync(x => x.Id == updateLoanSetting.Id);
            if (currentSetting == null)
                return new ResponseMessage { Success = false, Message = "Loan Setting Could not be found" };

            currentSetting.TypeOfLoan = updateLoanSetting.TypeOfLoan;
            currentSetting.LoanName = updateLoanSetting.LoanName;
            currentSetting.MaxDeductedPercent = updateLoanSetting.MaxDeductedPercent;
            currentSetting.MinDeductedPercent = updateLoanSetting.MinDeductedPercent;
            currentSetting.MaxLoanAmmount = updateLoanSetting.MaxLoanAmmount;
            currentSetting.PaymentYear = updateLoanSetting.PaymentYear;
            currentSetting.Remark = updateLoanSetting.Remark;

            await _dbContext.SaveChangesAsync();

            return new ResponseMessage { Success = true, Message = "Updated Successfully" };
        }
    }
}
