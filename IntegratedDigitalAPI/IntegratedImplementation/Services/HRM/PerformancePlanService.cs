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
    public class PerformancePlanService: IPerformancePlanService
    {
        private readonly ApplicationDbContext _dbContext;

        public PerformancePlanService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<PerformancePlanDto>> GetPerformancePlans()
        {
            return await _dbContext.PerformancePlans.AsNoTracking().
                          Select(x => new PerformancePlanDto
                          {
                              Id = x.Id,
                              Description = x.Description,
                              Name = x.Name,
                              TotalTarget = x.TotalTarget,
                              PerformancePlanDetais = _dbContext.PerformancePlanDetails.Where(z => z.PerformancePlanId == x.Id)
                                                       .Select(a => new PerformancePlanDetaiDto
                                                       {
                                                           Id = a.Id,
                                                           Name = a.Name,
                                                           Description = a.Description,
                                                           Target = a.Target
                                                       }).ToList()
                          }).ToListAsync();
        }

        public async Task<ResponseMessage> AddPerformancePlan(AddPerformancePlanDto addPerformancePlan)
        {
            PerformancePlan performance = new PerformancePlan()
            {
                Id = Guid.NewGuid(),
                CreatedById = addPerformancePlan.CreatedById,
                CreatedDate = DateTime.Now,
                Description = addPerformancePlan.Description,
                Name = addPerformancePlan.Name,
                TotalTarget = addPerformancePlan.TotalTarget,
                Rowstatus = RowStatus.ACTIVE,
            };

            await _dbContext.PerformancePlans.AddAsync(performance);
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage { Success = true, Message = "Added Succesfully" };
        }

        public async Task<ResponseMessage> AddPerformancePlanDetail(AddPerformancePlanDetailDto addPerformancePlan)
        {
            var currentTarget = await _dbContext.PerformancePlans.FirstOrDefaultAsync(x => x.Id == addPerformancePlan.PerformancePlanId);

            if (currentTarget == null)
                return new ResponseMessage { Success = false, Message = "Plan Could Not Be Found" };

            var totPer = await _dbContext.PerformancePlanDetails.Where(x => x.PerformancePlanId == currentTarget.Id).SumAsync(x => x.Target);

            if (totPer + addPerformancePlan.Target > currentTarget.TotalTarget)
                return new ResponseMessage { Success = false, Message = "The total Target is less than list of Targets" };

            PerformancePlanDetail performance = new PerformancePlanDetail()
            {
                Id = Guid.NewGuid(),
                CreatedById = addPerformancePlan.CreatedById,
                PerformancePlanId = addPerformancePlan.PerformancePlanId,
                CreatedDate = DateTime.Now,
                Description = addPerformancePlan.Description,
                Name = addPerformancePlan.Name,
                Target = addPerformancePlan.Target,
                Rowstatus = RowStatus.ACTIVE,
            };

            await _dbContext.PerformancePlanDetails.AddAsync(performance);
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage { Success = true, Message = "Added Succesfully" };
        }

      

        public async Task<ResponseMessage> UpdatePerformancePlan(UpdateperformancePlanDto updatePerformancePlan)
        {
            var currentPerformance = await _dbContext.PerformancePlans.FirstOrDefaultAsync(x => x.Id == updatePerformancePlan.Id);

            if (currentPerformance == null)
                return new ResponseMessage { Success = false, Message = "Could not find Performance" };


            currentPerformance.Description = updatePerformancePlan.Description;
            currentPerformance.Name = updatePerformancePlan.Name;
            currentPerformance.TotalTarget = updatePerformancePlan.TotalTarget;
              
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage { Success = true, Message = "Updated Succesfully" };
        }

        public async Task<ResponseMessage> UpdatePerformancePlanDetail(UpdatePerfromancePlanDetailDto updatePerformancePlan)
        {
            var currentPerformance = await _dbContext.PerformancePlanDetails.FirstOrDefaultAsync(x => x.Id == updatePerformancePlan.Id);

            if (currentPerformance == null)
                return new ResponseMessage { Success = false, Message = "Could not find Performance" };

            var currentTarget = await _dbContext.PerformancePlans.FirstOrDefaultAsync(x => x.Id == updatePerformancePlan.PerformancePlanId);

            if (currentTarget == null)
                return new ResponseMessage { Success = false, Message = "Plan Could Not Be Found" };

            var totPer = await _dbContext.PerformancePlanDetails.Where(x => x.PerformancePlanId == currentTarget.Id && x.Id != updatePerformancePlan.Id).SumAsync(x => x.Target);

            if (totPer + updatePerformancePlan.Target > currentTarget.TotalTarget)
                return new ResponseMessage { Success = false, Message = "The total Target is less than list of Targets" };


            currentPerformance.Description = updatePerformancePlan.Description;
            currentPerformance.Name = updatePerformancePlan.Name;
            currentPerformance.Target = updatePerformancePlan.Target;

            await _dbContext.SaveChangesAsync();

            return new ResponseMessage { Success = true, Message = "Updated Succesfully" };
        }
    }
}
