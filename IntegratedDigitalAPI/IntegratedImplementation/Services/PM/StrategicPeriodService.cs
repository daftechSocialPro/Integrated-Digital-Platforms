using Implementation.Helper;
using IntegratedImplementation.DTOS.PM;
using IntegratedImplementation.Interfaces.PM;
using IntegratedInfrustructure.Data;
using IntegratedInfrustructure.Model.PM;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.Services.PM
{
    public class StrategicPeriodService : IStrategicPeriodService
    {
        private readonly ApplicationDbContext _dbContext;

        public StrategicPeriodService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<ResponseMessage> AddStrategicPeriod(StrategicPeriodPostDto strategicPeriodPost)
        {
            // Calculate end date (5 years from start date)
            DateTime endDate = strategicPeriodPost.StartDate.AddYears(5).AddDays(-1);

            // Check for overlapping periods
            var overlappingPeriod = await _dbContext.StrategicPeriods
                .Where(x => x.Rowstatus == RowStatus.ACTIVE &&
                    ((strategicPeriodPost.StartDate >= x.StartDate && strategicPeriodPost.StartDate <= x.EndDate) ||
                     (endDate >= x.StartDate && endDate <= x.EndDate) ||
                     (strategicPeriodPost.StartDate <= x.StartDate && endDate >= x.EndDate)))
                .FirstOrDefaultAsync();

            if (overlappingPeriod != null)
            {
                return new ResponseMessage
                {
                    Message = $"A strategic period already exists that overlaps with the date range {strategicPeriodPost.StartDate:yyyy-MM-dd} to {endDate:yyyy-MM-dd}",
                    Success = false
                };
            }

            StrategicPeriod strategicPeriod = new StrategicPeriod
            {
                Id = Guid.NewGuid(),
                Name = strategicPeriodPost.Name,
                Description = strategicPeriodPost.Description,
                StartDate = strategicPeriodPost.StartDate,
                EndDate = endDate,
                CreatedById = strategicPeriodPost.CreatedById,
                Rowstatus = RowStatus.ACTIVE
            };

            await _dbContext.StrategicPeriods.AddAsync(strategicPeriod);
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage
            {
                Message = "Strategic Period added successfully",
                Success = true,
                Data = strategicPeriod
            };
        }

        public async Task<List<StrategicPeriodGetDto>> GetStrategicPeriodList()
        {
            var periodList = await _dbContext.StrategicPeriods
                .AsNoTracking()
                .OrderByDescending(x => x.StartDate)
                .Select(x => new StrategicPeriodGetDto
                {
                    Id = x.Id,
                    Name = x.Name,
                    Description = x.Description,
                    StartDate = x.StartDate,
                    EndDate = x.EndDate,
                    RowStatus = x.Rowstatus == RowStatus.ACTIVE ? true : false,
                }).ToListAsync();

            return periodList;
        }

        public async Task<ResponseMessage> UpdateStrategicPeriod(StrategicPeriodGetDto strategicPeriodGet)
        {
            var currentPeriod = await _dbContext.StrategicPeriods.FirstOrDefaultAsync(x => x.Id.Equals(strategicPeriodGet.Id));

            if (currentPeriod == null)
            {
                return new ResponseMessage { Success = false, Message = "Strategic Period not found" };
            }

            // Calculate end date (5 years from start date)
            DateTime endDate = strategicPeriodGet.StartDate.AddYears(5).AddDays(-1);

            // Check for overlapping periods (excluding current period)
            var overlappingPeriod = await _dbContext.StrategicPeriods
                .Where(x => x.Id != strategicPeriodGet.Id &&
                    x.Rowstatus == RowStatus.ACTIVE &&
                    ((strategicPeriodGet.StartDate >= x.StartDate && strategicPeriodGet.StartDate <= x.EndDate) ||
                     (endDate >= x.StartDate && endDate <= x.EndDate) ||
                     (strategicPeriodGet.StartDate <= x.StartDate && endDate >= x.EndDate)))
                .FirstOrDefaultAsync();

            if (overlappingPeriod != null)
            {
                return new ResponseMessage
                {
                    Message = $"A strategic period already exists that overlaps with the date range {strategicPeriodGet.StartDate:yyyy-MM-dd} to {endDate:yyyy-MM-dd}",
                    Success = false
                };
            }

            currentPeriod.Name = strategicPeriodGet.Name;
            currentPeriod.Description = strategicPeriodGet.Description;
            currentPeriod.StartDate = strategicPeriodGet.StartDate;
            currentPeriod.EndDate = endDate;
            currentPeriod.Rowstatus = strategicPeriodGet.RowStatus ? RowStatus.ACTIVE : RowStatus.INACTIVE;
            
            await _dbContext.SaveChangesAsync();
            return new ResponseMessage { Data = currentPeriod, Success = true, Message = "Updated Successfully" };
        }

        public async Task<ResponseMessage> DeleteStrategicPeriod(Guid id)
        {
            try
            {
                var strategicPeriod = await _dbContext.StrategicPeriods
                    .Include(x => x.StrategicPlans)
                    .FirstOrDefaultAsync(x => x.Id == id);
                
                if (strategicPeriod == null)
                {
                    return new ResponseMessage { Success = false, Message = "Strategic Period could not be found" };
                }

                // Check if there are any strategic plans associated with this period
                if (strategicPeriod.StrategicPlans.Any())
                {
                    var planNames = strategicPeriod.StrategicPlans.Select(x => x.Name).ToList();
                    return new ResponseMessage 
                    { 
                        Success = false, 
                        Message = $"Cannot delete this period. The following strategic plans are associated with it: {string.Join(", ", planNames)}" 
                    };
                }

                _dbContext.StrategicPeriods.Remove(strategicPeriod);
                await _dbContext.SaveChangesAsync();
                return new ResponseMessage { Success = true, Message = "Deleted Successfully!!" };
            }
            catch (Exception ex)
            {
                return new ResponseMessage { Success = false, Message = ex.Message };
            }
        }
    }
}

