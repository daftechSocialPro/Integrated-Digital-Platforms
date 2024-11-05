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
                          OrderBy(x => x.Index).
                          Select(x => new PerformancePlanDto
                          {
                              Id = x.Id,
                              Description = x.Description,
                              Index = x.Index,
                              TypeOfPerformance = x.TypeOfPerformance.ToString(),
                              
                          }).ToListAsync();
        }

        public async Task<ResponseMessage> AddPerformancePlan(AddPerformancePlanDto addPerformancePlan)
        {
            foreach (var  item in addPerformancePlan.PositionsId)
            {
                PerformancePlan performance = new PerformancePlan()
                {
                    Id = Guid.NewGuid(),
                    Index = addPerformancePlan.Index,
                    CreatedById = addPerformancePlan.CreatedById,
                    CreatedDate = DateTime.Now,
                    Description = addPerformancePlan.Description,
                    Rowstatus = RowStatus.ACTIVE,
                    PositionId = item,
                    TypeOfPerformance = addPerformancePlan.TypeOfPerformance,

                };

                await _dbContext.PerformancePlans.AddAsync(performance);
              
            }
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage { Success = true, Message = "Added Succesfully" };
        }

      
      

        public async Task<ResponseMessage> UpdatePerformancePlan(UpdateperformancePlanDto updatePerformancePlan)
        {
            var currentPerformance = await _dbContext.PerformancePlans.FirstOrDefaultAsync(x => x.Id == updatePerformancePlan.Id);

            if (currentPerformance == null)
                return new ResponseMessage { Success = false, Message = "Could not find Performance" };


            currentPerformance.Description = updatePerformancePlan.Description;
              
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage { Success = true, Message = "Updated Succesfully" };
        }

        public Task<ResponseMessage> AddPerformancePlanDetail(AddPerformancePlanDetailDto addPerformancePlan)
        {
            throw new NotImplementedException();
        }

        public Task<ResponseMessage> UpdatePerformancePlanDetail(UpdatePerfromancePlanDetailDto updatePerformancePlan)
        {
            throw new NotImplementedException();
        }
    }
}
