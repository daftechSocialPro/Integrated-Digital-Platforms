using DocumentFormat.OpenXml.InkML;
using DocumentFormat.OpenXml.Office2010.Excel;
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
using static System.Runtime.InteropServices.JavaScript.JSType;

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
                              IsManagerial = x.IsManagerial,
                              
                          }).ToListAsync();
        }

        public async Task<ResponseMessage> AddPerformancePlan(AddPerformancePlanDto addPerformancePlan)
        {
           
                PerformancePlan performance = new PerformancePlan()
                {
                    Id = Guid.NewGuid(),
                    Index = addPerformancePlan.Index,
                    CreatedById = addPerformancePlan.CreatedById,
                    CreatedDate = DateTime.Now,
                    Description = addPerformancePlan.Description,
                    Rowstatus = RowStatus.ACTIVE,
                    IsManagerial = addPerformancePlan.IsManagerial, 
                    TypeOfPerformance = addPerformancePlan.TypeOfPerformance,

                };

                await _dbContext.PerformancePlans.AddAsync(performance);
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

        public async Task<List<PerformanceScalesDto>> GetPerformanceScales()
        {
            return await _dbContext.PerformanceScales.AsNoTracking().
                         OrderBy(x => x.Rate).
                         Select(x => new PerformanceScalesDto
                         {
                             Id = x.Id,
                             Rate = x.Rate,
                             Definition = x.Definition,
                             Examples = x.Examples

                         }).ToListAsync();
        }

        public async Task<ResponseMessage> AddPerfomanceScale(AddPerformanceScaleDto addPerformanceScaleDto)
        {
            PerformanceScale performance = new PerformanceScale()
            {
                Id = Guid.NewGuid(),
                Rate = addPerformanceScaleDto.Rate,
                CreatedById = addPerformanceScaleDto.CreatedById,
                CreatedDate = DateTime.Now,
                Rowstatus = RowStatus.ACTIVE,
                Definition = addPerformanceScaleDto.Definition,
                Examples = addPerformanceScaleDto.Examples,

            };

            await _dbContext.PerformanceScales.AddAsync(performance);


            await _dbContext.SaveChangesAsync();

            return new ResponseMessage { Success = true, Message = "Added Succesfully" };
        }

        public async Task<ResponseMessage> UpdatePerformanceScale(PerformanceScalesDto updatePerformanceScale)
        {
            var currentPerformance = await _dbContext.PerformanceScales.FirstOrDefaultAsync(x => x.Id == updatePerformanceScale.Id);

            if (currentPerformance == null)
                return new ResponseMessage { Success = false, Message = "Could not find Performance" };



            currentPerformance.Rate = updatePerformanceScale.Rate;
            currentPerformance.Definition = updatePerformanceScale.Definition;
            currentPerformance.Examples = updatePerformanceScale.Examples;

            await _dbContext.SaveChangesAsync();

            return new ResponseMessage { Success = true, Message = "Updated Succesfully" };
        }
    }
}
