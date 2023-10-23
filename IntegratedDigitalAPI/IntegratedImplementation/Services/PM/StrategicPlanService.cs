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
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.Services.PM
{
    public class StrategicPlanService:IStrategicPlanService
    {
        private readonly ApplicationDbContext _dbContext;

        public StrategicPlanService (ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<ResponseMessage> AddStrategicPlan(StrategicPlanPostDto strategicPlansPost)
        {


            StrategicPlan strategicPlan = new StrategicPlan
            {
                Id = Guid.NewGuid(),
                Name = strategicPlansPost.Name,
                Description = strategicPlansPost.Description,
                CreatedById = strategicPlansPost.CreatedById,
                Rowstatus = RowStatus.ACTIVE
            };

            await _dbContext.StrategicPlans.AddAsync(strategicPlan);
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage
            {
                
                Message = "Added Successfully",
                Success = true
            };
        }


        public async Task<List<StrategicPlanGetDto>> GetStrategicPlanList()
        {
            var departmentList = await _dbContext.StrategicPlans.AsNoTracking().Select(x => new StrategicPlanGetDto
            {
                Id = x.Id,
                Name = x.Name,
                Description = x.Description,
            }).ToListAsync();

            return departmentList;
        }

        public async Task<ResponseMessage> UpdateStrategicPlan(StrategicPlanGetDto strategicPlansGet)
        {
            var currentStrategicPlan = await _dbContext.StrategicPlans.FirstOrDefaultAsync(x => x.Id.Equals(strategicPlansGet.Id));

            if (currentStrategicPlan != null)
            {
                currentStrategicPlan.Name = strategicPlansGet.Name;
                currentStrategicPlan.Description = strategicPlansGet.Description;
                await _dbContext.SaveChangesAsync();
                return new ResponseMessage { Data = currentStrategicPlan, Success = true, Message = "Updated Successfully" };
            }
            return new ResponseMessage { Success = false, Message = "Unable To Find Department" };
        }
    }
}
