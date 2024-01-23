using Implementation.Helper;
using IntegratedImplementation.DTOS.HRM;
using IntegratedImplementation.DTOS.PM;
using IntegratedImplementation.Interfaces.PM;
using IntegratedInfrustructure.Data;
using IntegratedInfrustructure.Model.HRM;
using IntegratedInfrustructure.Model.PM;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.Services.PM
{
    public class TimePeriodService :ITimePeriodService
    {

        private readonly ApplicationDbContext _dbContext;

        public TimePeriodService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<ResponseMessage> AddReportingPeriod(ReportingPeriodPostDto periodPost)
        {

            if (_dbContext.ReportingPeriods.Any(x => x.ReportingType == Enum.Parse<ReportingType>(periodPost.ReportingType)))

                return new ResponseMessage
                {

                    Message = $"Already Existing Report Type {periodPost.ReportingType} Exist, Please Update !!!",
                    Success = false
                };


            ReportingPeriod period = new ReportingPeriod
            {
                Id = Guid.NewGuid(),
                NumberOfDays = periodPost.NumberOfDays,
                ReportingType = Enum.Parse<ReportingType>(periodPost.ReportingType),
                CreatedDate = DateTime.Now,     
                CreatedById = periodPost.CreatedById,
                Rowstatus = RowStatus.ACTIVE
            };

            await _dbContext.ReportingPeriods.AddAsync(period);
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage
            {
                
                Message = "Added Successfully",
                Success = true
            };
        }


        public async Task<List<ReportingPeriodGetDto>> GetReportingPeriodList()
        {
            var reportingPeriodList = await _dbContext.ReportingPeriods.AsNoTracking().Select(x => new ReportingPeriodGetDto
            {
                Id = x.Id,
                NumberOfDays = x.NumberOfDays,
                ReportingType = x.ReportingType.ToString(),
            }).ToListAsync();

            return reportingPeriodList;
        }

        public async Task<ResponseMessage> UpdateReportingPeriod(ReportingPeriodGetDto repotingPeriod)
        {
            var currentReportingPeriod = await _dbContext.ReportingPeriods.FirstOrDefaultAsync(x => x.Id.Equals(repotingPeriod.Id));

            if (currentReportingPeriod != null)
            {
                currentReportingPeriod.NumberOfDays = repotingPeriod.NumberOfDays;
                currentReportingPeriod.ReportingType =Enum.Parse<ReportingType>(repotingPeriod.ReportingType);
                await _dbContext.SaveChangesAsync();
                return new ResponseMessage {  Success = true, Message = "Updated Successfully" };
            }
            return new ResponseMessage { Success = false, Message = "Unable To Find Department" };
        }


        public async Task<List<BudgetYearDto>> GetBudgetYears()
        {

            var budgetYearList = await _dbContext.BudgetYears.AsNoTracking().Select(x => new BudgetYearDto
            {
                Id = x.Id,
                BudgetYear = x.Year,
                Status = x.Rowstatus.ToString(),
            }).ToListAsync();

            return budgetYearList;


        }

        public async Task<ResponseMessage> AddBudgetYears(BudgetYearDto budgettYear)
        {


            BudgetYear budgetYear = new BudgetYear
            {
                Id = Guid.NewGuid(),
                Year = budgettYear.BudgetYear,
                Rowstatus = RowStatus.INACTIVE,
                CreatedById = budgettYear.CreatedById
                
            };

            await _dbContext.BudgetYears.AddAsync(budgetYear);
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage
            {

                Message = "Added Successfully",
                Success = true
            };
        }

        public async Task<ResponseMessage> UpdateBudgetYears(BudgetYearDto budgetYear)
        {
            var currentBudgetYear = await _dbContext.BudgetYears.FirstOrDefaultAsync(x => x.Id.Equals(budgetYear.Id));

            if(budgetYear.Status== "ACTIVE")
            {
                var budgetYears = await _dbContext.BudgetYears.ToListAsync();
                foreach (var budgetYe in budgetYears)
                {
                    
                    budgetYe.Rowstatus = RowStatus.INACTIVE;
                }
                
                await _dbContext.SaveChangesAsync();

            }

            if (currentBudgetYear != null)
            {
                currentBudgetYear.Year = budgetYear.BudgetYear;
                currentBudgetYear.Rowstatus = Enum.Parse<RowStatus>(budgetYear.Status);
                await _dbContext.SaveChangesAsync();
                return new ResponseMessage { Success = true, Message = "Updated Successfully" };
            }
            return new ResponseMessage { Success = false, Message = "Unable To Find Budget Year" };
        }


       

    }
}
